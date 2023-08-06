import Post from "../../models/Post.js";
import { globalUtils } from "../../utils/index.js";

// create post
export const createPostService = async (
    {title = '' ,
    body = '',
    cover = '',
    status = 'publish', 
    categoryId = '', 
    authorId = '',
   }) => {
    const article = new Post();
    article.title = title
    article.slug  = globalUtils.generateSlug(title)
    article.body  = body
    article.cover = cover
    article.status = status
    article.categoryId = categoryId
    article.authorId = authorId

    await article.save();
    return article._doc;
}