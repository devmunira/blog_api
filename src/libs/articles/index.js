import Post from "../../models/Post.js";
import { generateSortType, globalUtils } from "../../utils/index.js";


// create post
export const createPostService = async (
    {title = '' ,
    body = '',
    cover = '',
    status = 'publish', 
    categoryId = '', 
    authorId = '',
   }) => {
    // create new instance of post
    const article = new Post();
    article.title = title
    article.slug  = globalUtils.generateSlug(title)
    article.body  = body
    article.cover = cover
    article.status = status
    article.categoryId = categoryId
    article.authorId = authorId
    // save data to db
    await article.save();
    return article._doc;
}



// count post
export const countPostsService = (filter) => {
    return Post.count(filter);
}


// find all posts
export const findAllPostService = async (
    {search='',sortBy='updatedAt',sortType='asc',limit=10,page=1,categoryId='',author=''}
) => {
    // populate sortType val for query
    let sortTypeForDB = generateSortType(sortType);
    // destructured filter options for query
    let filter = {title : {$regex : search , $options : 'i'}}
    if(categoryId) filter.categoryId = categoryId
    if(author) filter.authorId = author

    // send request to db with all query params
    let articles = await Post.find(filter)
    .sort({[sortBy] : sortTypeForDB})
    .skip(page * limit - limit)
    .limit(limit)
    .populate({
        path   : 'authorId',
        select : 'username email'
        //TODO: populate category
    });

    // count total posts based on search query params only, not apply on pagination
    let totalItems = await countPostsService(filter) ;

    return {
        articles,
        totalItems
    }

}


// populate artilces data
export const populatePostService = (articles = [] , baseURL = '') => {
    return articles.length > 0 && articles.map((item) => {
        delete item._doc.__v;
        return {
            ...item._doc,
            links : `${process.env.API_BASE_URL}${baseURL}/${item._id}/${item.slug}`,
        }
    })

}