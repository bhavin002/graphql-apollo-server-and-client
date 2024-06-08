import { ApolloServer } from "apollo-server" // gql for create schema
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"  // enble playground
import typeDefs from "../gql/gqls.js";
import db from "../db/conn.js";
db();
import resolvers from "../resolvers/resolvers.js";
import dotEnv from "dotenv";
dotEnv.config();
import context from "../context/context.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({ url }) => {
    console.log(`Server running on ${url}`);
})