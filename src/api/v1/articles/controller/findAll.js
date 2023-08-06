import { findAllPostService, populatePostService } from "../../../../libs/articles/index.js";
import { generateAllDataHateoasLinks } from "../../../../utils/hateoasUtils.js";
import { generatePagination } from "../../../../utils/queryUtils.js";

// find all posts with pagination & sorting, searching
export const findAll = async (req,res,next) => {
    // getting query params
    let {search,sort_by,sort_type,limit,page,category,author} = req.query;
    search = search || '';
    sort_by = sort_by || 'asc'
    sort_type = sort_type || 'updatedAt'
    limit = limit || 10
    page = page || 1
    category = category || null
    author = author || null

    try {
        let {articles , totalItems} = await findAllPostService({search,sortBy : sort_by,sortType : sort_type , limit , page,categoryId : category , author});

        // count total Page
        let totalPage = Math.ceil(totalItems / limit)


        let result = {
            code : 200,
            message: 'Successfully data retrived!',
            data  : populatePostService(articles , req.baseUrl), 
            links : generateAllDataHateoasLinks(req.baseUrl,page,totalPage,req.query),
            pagination : generatePagination(totalPage,page,totalItems,limit)
        }

        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}