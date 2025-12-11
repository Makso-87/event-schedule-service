import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEventCategoryInput {
    @Field()
    name: string;

    @Field()
    color: string;

    @Field()
    description?: string;
}

@InputType()
export class UpdateEventCategoryInput {
    @Field()
    id: string;

    @Field()
    name?: string;

    @Field()
    description?: string;

    @Field()
    color?: string;
}

@InputType()
export class DeleteEventCategoryInput {
    @Field(() => [String])
    ids: string[];
}
