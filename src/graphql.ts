import express from 'express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
import { EventResolver } from './resolvers/eventResolver';
import { EventCategoryResolver } from './resolvers/eventCategoryResolver';
import { customAuthChecker } from './utils/customAuthChecker';

export const createGraphQLSchema = () => {
    return buildSchema({
        resolvers: [UserResolver, EventResolver, EventCategoryResolver],
        authChecker: customAuthChecker,
    });
};

export type TGraphQLContext = {
    req: express.Request;
    res: express.Response;
    userId?: string;
};
