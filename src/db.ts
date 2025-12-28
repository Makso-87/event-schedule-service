import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DB_HOST, DB_LOGIN, DB_NAME, DB_PASSWORD } from './env';
import { EventCategory } from './entities/EventCategory';
import { User } from './entities/User';
import { Event } from './entities/Event';
import * as migrations from './migrations/index';

console.log(`[db] ${DB_LOGIN}@${DB_HOST} - ${DB_NAME}`);

export const db = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_LOGIN,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Event, EventCategory],
    migrations: Object.values(migrations),
});
