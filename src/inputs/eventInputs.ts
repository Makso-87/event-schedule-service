import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateEventInput {
    @Field()
    name: string;

    @Field()
    startDate: Date;

    @Field({ nullable: true })
    endDate?: Date;

    @Field({ nullable: true })
    startTime?: string;

    @Field({ nullable: true })
    endTime?: string;

    @Field()
    place: string;

    @Field({ nullable: true })
    url?: string;

    @Field()
    categoryId: string;

    @Field({ nullable: true })
    lent?: string;
}

@InputType()
export class UpdateEventInput {
    @Field()
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    startDate?: Date;

    @Field({ nullable: true })
    endDate?: Date;

    @Field({ nullable: true })
    startTime?: string;

    @Field({ nullable: true })
    endTime?: string;

    @Field({ nullable: true })
    place?: string;

    @Field({ nullable: true })
    url?: string;

    @Field({ nullable: true })
    categoryId?: string;

    @Field({ nullable: true })
    lent?: string;
}

@InputType()
export class DeleteEventsInput {
    @Field(() => [String])
    ids: string[];
}
