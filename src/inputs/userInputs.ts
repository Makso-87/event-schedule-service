import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String)
    firstName: string;

    @Field(() => String)
    middleName?: string;

    @Field(() => String)
    lastName: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String)
    password: string;
}

@InputType()
export class LoginInput {
    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String)
    password: string;
}

@InputType()
export class UsersDeleteInput {
    @Field(() => [String])
    ids: string[];
}
