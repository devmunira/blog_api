import { query } from "express-validator";

const isSortType = (val,array=['asc' ,'desc']) => {
    if(!array.includes(val)) throw new Error('Sort Type must be asc Or desc')
    return true
}

const isSortBy = (val,array=['updatedAt' , 'title']) => {
    if(!array.includes(val)) throw new Error('Sort By must be updatedAt Or title')
    return true
}

export const getPostRequest = [
    query('page')
    .optional()
    .isInt()
    .withMessage('Page must be an integer')
    ,
    query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be an integer between 1 and 100'),
    query('search')
    .optional()
    .isString().notEmpty().withMessage('Search query must be a non-empty string'),
    query('sortType')
    .optional()
    .trim()
    .custom(val => isSortType(val)),
    query('sortBy')
    .optional()
    .trim()
    .custom(val => isSortBy(val)),
];