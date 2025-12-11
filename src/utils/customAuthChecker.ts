import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env';
import { TGraphQLContext } from '../graphql';

export const customAuthChecker: AuthChecker<TGraphQLContext> = ({ context }) => {
    const auth = context.req.headers.authorization;

    if (!auth) {
        return false;
    }

    const [, token] = auth.split(' ');

    if (!token) {
        return false;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    context.userId = (payload as jwt.JwtPayload).userId;
    return true;
};
