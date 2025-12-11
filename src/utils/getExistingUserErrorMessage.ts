import { CreateUserInput } from '../inputs/userInputs';
import { User } from '../entities/User';

type TContactsUserInputData = Pick<CreateUserInput, 'email' | 'phone'>;
export const getExistingUserErrorMessage = ({ phone, email }: TContactsUserInputData, user: User): string => {
    let variableText;

    switch (true) {
        case user.phone === phone && user.email === email:
            variableText = `такими email: ${email} и телефоном: ${phone}`;
            break;
        case user.phone === phone && user.email !== email:
            variableText = `таким телефоном: ${phone}`;
            break;
        default:
            variableText = `таким email: ${email}`;
    }

    return `Пользователь с ${variableText} уже существует!`;
};
