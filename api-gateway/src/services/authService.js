import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:4001/graphql";

export const registerUser = async (email, password, name, profileImage, role) => {
  try {
    console.log(`Sending register request to auth service: ${AUTH_SERVICE_URL}`);

    const response = await axios.post(AUTH_SERVICE_URL, {
      query: `
        mutation Register(
          $email: String!, 
          $password: String!,
          $name: String!,
          $profileImage: String!,
          $role: String!
        ) {
          register(
            email: $email, 
            password: $password,
            name: $name,
            profileImage: $profileImage,
            role: $role
          ) {
            token
            user {
              id
              email
              name
              profileImage
              role
            }
          }
        }
      `,
      variables: { email, password, name, profileImage, role },
    });

    if (response.data.errors) {
      console.error("Auth service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.register;
  } catch (error) {
    console.error("Register request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    console.log(`Sending login request to auth service: ${AUTH_SERVICE_URL}`);

    const response = await axios.post(AUTH_SERVICE_URL, {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              email
              name
              profileImage
              role
            }
          }
        }
      `,
      variables: { email, password }
    });

    if (response.data.errors) {
      console.error("Auth service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.login;
  } catch (error) {
    console.error("Login request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to login user: ${error.message}`);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    console.log(`Sending password reset request to auth service: ${AUTH_SERVICE_URL}`);

    const response = await axios.post(AUTH_SERVICE_URL, {
      query: `
        mutation RequestPasswordReset($email: String!) {
          requestPasswordReset(email: $email) {
            message
            success
          }
        }
      `,
      variables: { email }
    });

    if (response.data.errors) {
      console.error("Auth service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.requestPasswordReset;
  } catch (error) {
    console.error("Password reset request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to request password reset: ${error.message}`);
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    console.log(`Sending reset password request to auth service: ${AUTH_SERVICE_URL}`);

    const response = await axios.post(AUTH_SERVICE_URL, {
      query: `
        mutation ResetPassword($token: String!, $newPassword: String!) {
          resetPassword(token: $token, newPassword: $newPassword) {
            message
            success
          }
        }
      `,
      variables: { token, newPassword }
    });

    if (response.data.errors) {
      console.error("Auth service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.resetPassword;
  } catch (error) {
    console.error("Reset password request failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to reset password: ${error.message}`);
  }
};

export const verifyToken = async (token) => {
  try {
    console.log(`Verifying token with auth service: ${AUTH_SERVICE_URL}`);

    const response = await axios.post(AUTH_SERVICE_URL, {
      query: `
        query VerifyToken($token: String!) {
          verifyToken(token: $token) {
            user {
              id
              email
              name
              profileImage
              role
            }
          }
        }
      `,
      variables: { token }
    });

    if (response.data.errors) {
      console.error("Auth service returned errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data.verifyToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
    }
    throw new Error(`Failed to verify token: ${error.message}`);
  }
};
