import express from "express";
import { ApolloServer } from "apollo-server-express";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as authTypeDefs } from "./graphql/auth/typeDefs.js";
import { resolvers as authResolvers } from "./graphql/auth/resolvers.js";
import { typeDefs as userDataTypeDefs } from "./graphql/userData/typeDefs.js";
import { resolvers as userDataResolvers } from "./graphql/userData/resolvers.js";
import { typeDefs as workoutTypeDefs } from "./graphql/workout/typeDefs.js";
import { resolvers as workoutResolvers } from "./graphql/workout/resolvers.js";
import { typeDefs as chatbotTypeDefs } from "./graphql/chatbot/typeDefs.js";
import { resolvers as chatbotResolvers } from "./graphql/chatbot/resolvers.js";
import dotenv from "dotenv";

dotenv.config();

// Log environment variables for debugging
console.log("API Gateway Configuration:");
console.log("PORT:", process.env.PORT);
console.log("AUTH_SERVICE_URL:", process.env.AUTH_SERVICE_URL);
console.log("USER_DATA_SERVICE_URL:", process.env.USER_DATA_SERVICE_URL);
console.log("WORKOUT_SERVICE_URL:", process.env.WORKOUT_SERVICE_URL);
console.log("CHATBOT_SERVICE_URL:", process.env.CHATBOT_SERVICE_URL);

const startServer = async () => {
  const app = express();

  // Combine all schemas and resolvers
  const typeDefs = mergeTypeDefs([authTypeDefs, userDataTypeDefs, workoutTypeDefs, chatbotTypeDefs]);
  const resolvers = mergeResolvers([authResolvers, userDataResolvers, workoutResolvers, chatbotResolvers]);

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
