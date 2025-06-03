import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import connectDB from "./config/db.js";

dotenv.config();

// Log environment variables at startup
console.log("Chatbot Service Configuration:");
console.log("PORT:", process.env.PORT);
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  await connectDB();

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(
      `🤖 Chatbot service running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((error) => {
  console.error("Failed to start chatbot service:", error);
  process.exit(1);
});
