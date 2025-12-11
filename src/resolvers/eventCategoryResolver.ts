import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { EventCategory } from '../entities/EventCategory';
import { db } from '../db';
import {
    CreateEventCategoryInput,
    DeleteEventCategoryInput,
    UpdateEventCategoryInput,
} from '../inputs/eventCategoryInputs';
import { checkToExistCategoryByColor, checkToExistCategoryByName } from '../utils/checkToExistCategory';

@Resolver()
export class EventCategoryResolver {
    @Query(() => [EventCategory])
    async categories() {
        return db.manager.find(EventCategory, { relations: { events: { category: true } } });
    }

    @Authorized()
    @Mutation(() => EventCategory)
    async createCategory(@Arg('input') input: CreateEventCategoryInput) {
        const { name, color, description } = input;
        const existCategory = await db.manager.findOne(EventCategory, { where: { name } });
        const existColorCategory = await db.manager.findOne(EventCategory, { where: { color } });

        checkToExistCategoryByName({ existCategory, name });
        checkToExistCategoryByColor({ existCategory: existColorCategory, color });

        const newCategory = db.manager.create(EventCategory, { name, color, description });
        await db.manager.save(EventCategory, newCategory);

        return newCategory;
    }

    @Authorized()
    @Mutation(() => EventCategory)
    async updateCategory(@Arg('input') input: UpdateEventCategoryInput) {
        const { id, name, color, description } = input;

        const category = await db.manager.findOne(EventCategory, { where: { id } });

        if (!category) {
            throw new Error(`Категория с таким ID ${id} не найдена.`);
        }

        if (category.name !== name) {
            const existCategory = await db.manager.findOne(EventCategory, { where: { name } });
            checkToExistCategoryByName({ existCategory, name });
        }

        db.manager.merge(EventCategory, category, { name, color, description });

        await db.manager.save(EventCategory, category);

        return category;
    }

    @Authorized()
    @Mutation(() => [String])
    async deleteCategories(@Arg('input') input: DeleteEventCategoryInput) {
        const { ids } = input;
        await db.manager.softDelete(EventCategory, ids);

        return ids;
    }
}
