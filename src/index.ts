import 'reflect-metadata';
import 'dotenv/config';
import type { SecureVersion } from 'node:tls';
import path from 'path';
import https, { ServerOptions } from 'node:https';
import { readFileSync } from 'node:fs';
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
    apollo.applyMiddleware({ app, path: '/api' });

    app.get('/health-check', (req, res) => {
        res.send('Харе Кришна! Всё харишо, работаем!');
    });

    if (NODE_ENV === 'production') {
        const sslOptions: ServerOptions = {
            key: readFileSync(path.join(__dirname, '..', '/certs/privkey.pem')),
            cert: readFileSync(path.join(__dirname, '..', '/certs/fullchain.pem')),
            minVersion: 'TLSv1.3' as SecureVersion,
            honorCipherOrder: true,
        };

        const httpsServer = https.createServer(sslOptions, app);

        httpsServer.listen(Number(PORT), '0.0.0.0', () => {
            console.log(`🚀 Сервис запущен на ${PORT} порту`);
        });
    } else {
        app.listen(PORT, () => console.log(`🚀 Сервис запущен на ${PORT} порту`));
    }
})();
