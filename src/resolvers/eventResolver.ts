import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { db } from '../db';
import { Event } from '../entities/Event';
import { CreateEventInput, DeleteEventsInput, UpdateEventInput } from '../inputs/eventInputs';
import { EventCategory } from '../entities/EventCategory';

@Resolver()
export class EventResolver {
    @Query(() => [Event])
    async events() {
        return db.manager.find(Event, { relations: { category: { events: true } } });
    }

    @Authorized()
    @Mutation(() => Event)
    async createEvent(@Arg('input') input: CreateEventInput) {
        const { name, startDate, endDate, startTime, endTime, place, lent, url, categoryId } = input;
        const category = await db.manager.findOne(EventCategory, { where: { id: categoryId } });

        if (!category) {
            throw new Error(`Категория с таким ID ${categoryId} не найдена`);
        }

        const newEvent = db.manager.create(Event, {
            name,
            startDate,
            endDate,
            startTime,
            endTime,
            place,
            lent,
            url,
            categoryId,
            category,
        });

        await db.manager.save(Event, newEvent);

        return newEvent;
    }

    @Authorized()
    @Mutation(() => Event)
    async updateEvent(@Arg('input') input: UpdateEventInput) {
        const { id, categoryId, ...data } = input;
        const event = await db.manager.findOne(Event, { where: { id } });

        if (!event) {
            throw new Error(`Событие с таким ID ${id} не найдено`);
        }

        const category = await db.manager.findOne(EventCategory, { where: { id: categoryId } });

        if (!category) {
            throw new Error(`Категория с таким ID ${categoryId} не найдена`);
        }

        db.manager.merge(Event, event, { ...data, categoryId, category });

        await db.manager.save(Event, event);

        return event;
    }

    @Authorized()
    @Mutation(() => [String])
    async deleteEvents(@Arg('input') input: DeleteEventsInput) {
        const { ids } = input;
        await db.manager.softDelete(Event, ids);

        return ids;
    }
}
