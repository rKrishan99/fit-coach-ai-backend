import { gql } from "apollo-server-express";
import { authController } from "../controller/authController.js";

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

  type ResetResponse {
    message: String!
    success: Boolean!
  }

  type VerifyResponse {
    user: User!
  }

  type Query {
    _: Boolean
    verifyToken(token: String!): VerifyResponse!
  }

  type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      profileImage: String!
      role: String!
    ): AuthPayload!

    login(email: String!, password: String!): AuthPayload!

    requestPasswordReset(email: String!): ResetResponse!

    resetPassword(token: String!, newPassword: String!): ResetResponse!
  }
`;

export const resolvers = {
  Query: {
    _: () => true,
    
    verifyToken: async (_, { token }) => {
      return await authController.verifyToken(token);
    },
  },

  Mutation: {
    register: async (_, userData) => {
      return await authController.register(userData);
    },

    login: async (_, credentials) => {
      return await authController.login(credentials);
    },

    requestPasswordReset: async (_, { email }) => {
      return await authController.requestPasswordReset(email);
    },

    resetPassword: async (_, resetData) => {
      return await authController.resetPassword(resetData);
    },
  },
};


