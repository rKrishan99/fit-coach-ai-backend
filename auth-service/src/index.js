import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db.js";
import { typeDefs, resolvers } from "./graphql/schema.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  const PORT = process.env.PORT;

  // Create Apollo Server
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
