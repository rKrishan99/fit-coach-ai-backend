import { gql } from "apollo-server-express";
import { registerUser } from "../services/authService.js";

export const typeDefs = gql`
  type Query {
    _: Boolean
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

// ✅ THIS is what was missing:
export const resolvers = {
  Mutation: {
    register: async (_, { email, password, name, profileImage, role }) => {
      return await registerUser(email, password, name, profileImage, role);
    },
  },
};
