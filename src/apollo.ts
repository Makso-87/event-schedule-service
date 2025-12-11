import { ApolloServer } from 'apollo-server-express';
import { createGraphQLSchema, TGraphQLContext } from './graphql';

export const createApolloServer = async () => {
    const apollo = new ApolloServer({
        schema: await createGraphQLSchema(),
        context: ({ req, res }: TGraphQLContext) => {
            return { req, res };
        },
    });

    await apollo.start();

    return apollo;
};
