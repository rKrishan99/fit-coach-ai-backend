import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type WorkoutPlan {
    id: ID!
    userId: ID!
    plan: String!
    createdAt: String!
  }

  type Query {
    getWorkoutPlan(userId: ID!): WorkoutPlan
  }

  type Mutation {
    generateWorkoutPlan(userId: ID!): WorkoutPlan
  }
`;
