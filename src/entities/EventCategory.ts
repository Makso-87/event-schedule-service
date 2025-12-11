import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Base } from './Base';
import { Event } from './Event';

@Entity()
@ObjectType()
export class EventCategory extends Base {
    @Column({ unique: true })
    @Field()
    name: string;

    @Column()
    @Field()
    description?: string;

    @Column({ unique: true })
    @Field()
    color: string;

    @OneToMany(() => Event, (event) => event.category)
    @Field(() => [Event], { nullable: true })
    events: Event[];
}
