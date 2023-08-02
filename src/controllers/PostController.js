import { filterArtilces } from "../libs/post.js";

// Send responses according to search with pagination
export const getAllArticles = async (req, res, next) => {
    try {
        // 2. Get all query parameters
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sort_by || "updatedAt";
        const sortType = req.query.sort_type || "asc";

        //3. Proccess artilces from model
        let result = await filterArtilces(search,sortType,sortBy,page,limit,req.url)
        //4. send responses 
        res.status(200).json({
            code : 200,
            message : 'Success',
            result
        });
    } catch (error) {
        next(error)
    }
};


// send single Article data
export const getSingleArticle = (req, res, next) => {
};


// create new Article
export const createArticle = (req, res, next) => {
};

// update exiting Article
// or create new one if Article not found
export const updateOrCreateArticle = (req, res, next) => {
};


// update exiting Article
export const updateArticle = (req, res, next) => {
};


// delete exiting Article along with all commnets and articles
export const deleteArticle = (req, res, next) => {
};
