require('dotenv').config();

import express = require('express');
import { Application } from "express";
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from './graphql';

const port = 9000;

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: () => ({ db }) 
    });
    server.applyMiddleware({app, path: '/api'});

    app.use(express.json());

    app.listen(port);

    console.log(`[app]: http://localhost:${port}`);

};

mount(express());