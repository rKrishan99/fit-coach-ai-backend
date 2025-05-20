import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  const PORT = process.env.PORT;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ User server is running on port ${PORT}`);
  });
};

startServer();
