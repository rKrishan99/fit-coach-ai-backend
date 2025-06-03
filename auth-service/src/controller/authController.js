import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../model/User.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  logger: true,
  debug: true,
});

export const authController = {
  // Register user
  register: async (userData) => {
    const { email, password, name, profileImage, role } = userData;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        profileImage,
        role,
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  // Login user
  login: async (credentials) => {
    const { email, password } = credentials;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email address");
      }

      console.log("=== EMAIL DEBUG INFO ===");
      console.log("Requested email:", email);
      console.log("EMAIL env exists:", !!process.env.EMAIL);
      console.log("EMAIL env value:", process.env.EMAIL);
      console.log("PASSWORD env exists:", !!process.env.PASSWORD);
      console.log("PASSWORD env length:", process.env.PASSWORD?.length);
      console.log("PASSWORD env length:", process.env.CLIENT_URL);
      console.log("========================");

      // Verify transporter configuration
      console.log("Verifying transporter...");
      try {
        await transporter.verify();
        console.log("✅ Transporter verified successfully");
      } catch (verifyError) {
        console.error("❌ Transporter verification failed:", verifyError);
        throw new Error(`Email configuration error: ${verifyError.message}`);
      }

      const resetToken = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          purpose: "password_reset",
          timestamp: Date.now(),
        },
        process.env.JWT_SECRET + user.password,
        { expiresIn: "1h" }
      );

      // Create reset URL
      const resetUrl = `${process.env.CLIENT_URL}reset-password?token=${resetToken}`;

      // Email content
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "FitCoach AI - Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2caa8e;">Password Reset Request</h2>
            <p>Hello ${user.name},</p>
            <p>You requested a password reset for your FitCoach AI account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #2caa8e; color: white; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p>Or copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              FitCoach AI Team<br>
              This is an automated email, please do not reply.
            </p>
          </div>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      console.log(`Password reset email sent to: ${email}`);

      return {
        message:
          "Password reset email sent successfully. Please check your inbox.",
        success: true,
      };
    } catch (error) {
      console.error("Password reset request error:", error);
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }
  },

  // Reset password
  resetPassword: async (resetData) => {
    const { token, newPassword } = resetData;

    try {
      // First, decode the token to get user info (without verification)
      const decoded = jwt.decode(token);
      if (!decoded || decoded.purpose !== "password_reset") {
        throw new Error("Invalid reset token");
      }

      // Find user by email from token
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Verify token with user's current password as additional salt
      // This ensures token becomes invalid if password was already changed
      try {
        jwt.verify(token, process.env.JWT_SECRET + user.password);
      } catch (jwtError) {
        throw new Error("Invalid or expired reset token");
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user password
      user.password = hashedPassword;
      await user.save();

      console.log(`Password reset successful for user: ${user.email}`);

      return {
        message:
          "Password reset successful. You can now login with your new password.",
        success: true,
      };
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(`Failed to reset password: ${error.message}`);
    }
  },

  // Verify JWT token
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          profileImage: user.profileImage,
          role: user.role,
        },
      };
    } catch (error) {
      console.error("Token verification error:", error);
      throw new Error(`Token verification failed: ${error.message}`);
    }
  },
};
