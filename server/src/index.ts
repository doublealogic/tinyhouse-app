import express = require('express');
import {ApolloServer} from 'apollo-server-express';
import { typeDefs, resolvers} from './graphql';

const app = express();
const port = 9000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({app, path: '/api'});

app.use(express.json());

app.listen(port);

console.log(`[app]: http://localhost:${port}`);