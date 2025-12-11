import { TCheckToExistCategory } from '../types';

export const checkToExistCategoryByName: TCheckToExistCategory = ({ existCategory, name }) => {
    if (existCategory) {
        throw new Error(`Категория с таким именем "${name}" уже существует.`);
    }
};

export const checkToExistCategoryByColor: TCheckToExistCategory = ({ existCategory, color }) => {
    if (existCategory) {
        throw new Error(`Цвет ${color} уже используется для категории "${existCategory.name}".`);
    }
};
