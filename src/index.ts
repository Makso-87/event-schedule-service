import 'reflect-metadata';
import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { db } from './db';
import { createApolloServer } from './apollo';
import { NODE_ENV, PORT } from './env';

(async () => {
    const app = express();
    const apollo = await createApolloServer();

    if (NODE_ENV !== 'production') {
        app.use(cors());
    }

    app.use(json({ limit: '500kb' }));
    // app.use(graphqlUploadExpress());

    await db.initialize();
    apollo.applyMiddleware({ app, path: '/' });

    app.listen(PORT, () => console.log(`Приложение запущено на ${PORT} порту`));
})();
