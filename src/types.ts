import { EventCategory } from './entities/EventCategory';

export type TCheckToExistCategoryArgs = {
    existCategory: EventCategory;
    name?: string;
    color?: string;
};
export type TCheckToExistCategory = ({ existCategory, name }: TCheckToExistCategoryArgs) => void;
