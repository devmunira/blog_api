import { body, query } from "express-validator";
import Post from "../models/Post.js";


const isSortType = (val,array=['asc' ,'desc']) => {
    if(!array.includes(val)) throw new Error('Sort Type must be asc Or desc')
    return true
}

const isSortBy = (val,array=['updatedAt' , 'title']) => {
    if(!array.includes(val)) throw new Error('Sort By must be updatedAt Or title')
    return true
}

const isStatusType = (val, array=['publish' , 'unpublish' , 'draft']) => {
    if(!array.includes(val)) throw new Error('Status must be publish , unpublish Or draft')
    return true
}


// Find All Query params check
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


// create new post query params check
export const createPostRequest = [
    body('title')
    .trim()
    .notEmpty()
    .withMessage('title field is required!')
    .bail()
    .isLength({max: 50})
    .withMessage('Tilte must not be greater than 50 chars!')
    .bail()
    .custom(async val => {
        const posts = await Post.find({title : {$regex: val, $options: 'i'}}).exec()
        if(posts.length > 0) return Promise.reject('Title must be unique!')
        return true;
    })
    ,
    body('categoryId')
    .trim()
    .isString()
    .withMessage('Enter a valid category id'),
    body('body')
    .optional()
    .trim()
    .isString()
    .withMessage('Post details must be a string type!')
    ,
    body('cover')
    .optional()
    .trim()
    .isURL()
    .withMessage('For Cover photo must be enter a valid file path')
    ,
    body('status')
    .optional()
    .trim()
    .custom(val => isStatusType(val))

]