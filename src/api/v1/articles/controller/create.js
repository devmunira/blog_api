import { createArticleService } from "../../../../libs/articles/index.js";
import  {generateCreateHateoasLinks}  from "./../../../../utils/index.js";



// Create New Article 
const createArticle = async (req,res,next) => {
    const {categoryId,title,body,cover,status} = req.body;
    try {
        const article = await createArticleService({title,body,cover,status,categoryId,authorId:req.user._id});
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

export default createArticle;