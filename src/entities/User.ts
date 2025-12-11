import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Base } from './Base';

@Entity()
@ObjectType()
export class User extends Base {
    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    middleName?: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    email?: string;

    @Column()
    @Field()
    phone?: string;

    @Column()
    @Field()
    password: string;
}
