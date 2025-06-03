import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Message {
    sender: String!
    text: String!
    timestamp: String!
  }

  type ChatResponse {
    reply: String!
    history: [Message!]!
  }

  type Query {
    getChatHistory(userId: String!): [Message!]!
  }

  type Mutation {
    sendMessage(userId: String!, message: String!): ChatResponse
  }
`;
