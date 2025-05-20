import express from "express";
import { ApolloServer } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as authTypeDefs } from "./graphql/auth/schema.js";
import { resolvers as authResolvers } from "./graphql/auth/resolvers.js";
import { typeDefs as userTypeDefs } from "./graphql/user/schema.js";
import { resolvers as userResolvers } from "./graphql/user/resolvers.js";
import { typeDefs as workoutTypeDefs } from "./graphql/workout/schema.js";
import { resolvers as workoutResolvers } from "./graphql/workout/resolvers.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  // Combine all schemas and resolvers
  const typeDefs = mergeTypeDefs([authTypeDefs, userTypeDefs, workoutTypeDefs]);
  const resolvers = mergeResolvers([authResolvers, userResolvers, workoutResolvers]);

  // Create executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create Apollo Server with combined schema
  const server = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT;
  app.listen(PORT, () =>
    console.log(
      `🚀 API Gateway running at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
