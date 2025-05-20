import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type UserBio {
    id: ID!
    userId: ID!
    age: Int!
    gender: String!
    weight: Float!
    height: Float!
    healthLimitation: String!
    fitnessGoal: String!
    activityLevel: String!
    workoutDays: String!
    experienceLevel: String!
    createdAt: String!
  }

  type Query {
    getUserBio(userId: ID!): UserBio
    _: Boolean
  }

  type Mutation {
    createUserBio(
      userId: ID!
      age: Int!
      gender: String!
      weight: Float!
      height: Float!
      healthLimitation: String!
      fitnessGoal: String!
      activityLevel: String!
      workoutDays: String!
      experienceLevel: String!
    ): UserBio!

    updateUserBio(
      id: ID!
      age: Int
      gender: String
      weight: Float
      height: Float
      healthLimitation: String
      fitnessGoal: String
      activityLevel: String
      workoutDays: String
      experienceLevel: String
    ): UserBio!
  }
`;
