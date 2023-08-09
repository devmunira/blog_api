import { createPostService } from "../../../../libs/articles/index.js";
import Post from "../../../../models/Post.js";
import  {generateCreateHateoasLinks, globalUtils}  from "./../../../../utils/index.js";



// Create New Post 
const createPost = async (req,res,next) => {
    const {categoryId,title,body,cover,status} = req.body;
    try {
        const article = await createPostService({title,body,cover,status,categoryId,authorId:req.user._id});
        res.status(201).json({
            code : 201,
            message : 'Article created successfully!',
            article : {
                ...article,
            },
            links : generateCreateHateoasLinks(req.baseUrl , article._id , article.slug)
        })
    } catch (err) {
        next(err)  
    }
}

export default createPost;