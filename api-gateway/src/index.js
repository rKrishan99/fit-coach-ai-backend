import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/schema.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers});
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
