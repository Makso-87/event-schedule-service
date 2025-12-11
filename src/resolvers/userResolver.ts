import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '../db';
import { JWT_SECRET } from '../env';
import { User } from '../entities/User';
import { CreateUserInput, LoginInput, UsersDeleteInput } from '../inputs/userInputs';
import { getExistingUserErrorMessage } from '../utils/getExistingUserErrorMessage';
import { createUser } from '../utils/createUser';
import { TGraphQLContext } from '../graphql';

@Resolver()
export class UserResolver {
    @Authorized()
    @Query(() => User)
    async me(@Ctx() ctx: TGraphQLContext) {
        const user = await db.manager.findOne(User, { where: { id: ctx.userId } });

        if (user) {
            return user;
        }

        throw new Error('Такого пользователя не существует');
    }

    @Query(() => [User])
    async users() {
        return db.manager.find(User);
    }

    @Mutation(() => User)
    async createUser(@Arg('input') input: CreateUserInput) {
        const { email, phone } = input;

        if (!email && !phone) {
            throw new Error('Для регистрации пользователю необходимо предоставить email или номер телефона');
        }

        const existUser = await db.manager.findOne(User, { where: [{ email }, { phone }] });

        if (existUser) {
            throw new Error(getExistingUserErrorMessage({ email, phone }, existUser));
        }

        return createUser(input);
    }

    @Authorized()
    @Mutation(() => [String])
    async deleteUsers(@Arg('input') input: UsersDeleteInput) {
        const { ids } = input;
        await db.manager.softDelete(User, ids);

        return ids;
    }

    @Mutation(() => String)
    async login(@Arg('input') input: LoginInput): Promise<string> {
        const { phone, email, password } = input;

        if (!phone && !email) {
            throw new Error('Необходимо ввести номер телефона или email');
        }

        const where = phone ? { phone } : { email };

        const user = await db.manager.findOne(User, { where });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Неверный пароль');
        }

        return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    }
}
