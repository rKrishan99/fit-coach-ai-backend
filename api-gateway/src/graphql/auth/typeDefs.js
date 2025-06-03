import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    _: Boolean
    verifyToken(token: String!): VerifyResponse!
  }

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
