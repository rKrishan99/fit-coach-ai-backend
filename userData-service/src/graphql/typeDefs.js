import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type UserData {
    id: ID!
    userId: String!
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
    getUserData(userId: String!): UserData
    _: Boolean
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
      activityLevel: String!
      workoutDays: String!
      experienceLevel: String!
    ): UserData!

    updateUserData(
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
    ): UserData!
  }
`;
