import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './Base';
import { EventCategory } from './EventCategory';

@Entity()
@ObjectType()
export class Event extends Base {
    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    startDate: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    endDate?: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    startTime?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    endTime?: string;

    @Column()
    @Field()
    place: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    url?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    lent?: string;

    @Column()
    @Field()
    categoryId: string;

    @ManyToOne(() => EventCategory, (eventCategory) => eventCategory.events)
    @Field(() => EventCategory)
    category: EventCategory;
}
