import { gql } from "apollo-server-express";

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

    login(email: String!, password: String!): AuthPayload!
  }
`;


;
