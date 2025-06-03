import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type UserData {
    id: String!
    userId: String!
    age: Int!
    gender: String!
    weight: Float!
    height: Float!
    healthLimitation: String!
    fitnessGoal: String!
    workoutDays: String!
    activityLevel: String!
    experienceLevel: String!
    createdAt: String!
  }

  type Query {
    getUserData(userId: String!): UserData
  }

  type Mutation {
    createUserData(
      userId: String!
      age: Int!
      gender: String!
      weight: Float!
      height: Float!
      healthLimitation: String!
      fitnessGoal: String!
      workoutDays: String!
      activityLevel: String!
      experienceLevel: String!
    ): UserData!

    updateUserData(
      userId: String!
      age: Int
      gender: String
      weight: Float
      height: Float
      healthLimitation: String
      fitnessGoal: String
      workoutDays: String
      activityLevel: String
      experienceLevel: String
    ): UserData!
  }
`;
