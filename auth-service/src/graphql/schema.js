import { gql } from "apollo-server-express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
    profileImage: String
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      profileImage: String!
      role: String!
    ): AuthPayload!
  }
`;

export const resolvers = {
  Query: {
    _: () => true,
  },
  Mutation: {
    register: async (_, { email, password, name, profileImage, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

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
    },
  },
};
