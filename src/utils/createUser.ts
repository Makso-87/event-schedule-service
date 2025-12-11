import bcrypt from 'bcryptjs';

import { db } from '../db';
import { CreateUserInput } from '../inputs/userInputs';
import { User } from '../entities/User';

export const createUser = async (data: CreateUserInput): Promise<User> => {
    const { lastName, middleName, firstName, email, phone, password } = data;

    const hashed = await bcrypt.hash(password, 12);

    const newUser = db.manager.create(User, { lastName, middleName, firstName, email, phone, password: hashed });
    await db.manager.save(User, newUser);

    return newUser;
};
