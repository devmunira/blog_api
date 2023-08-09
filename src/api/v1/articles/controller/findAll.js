import { defaults } from "../../../../config/index.js";
import { findAllArticleService } from "../../../../libs/articles/index.js";
import { generateAllDataHateoasLinks } from "../../../../utils/hateoasUtils.js";
import { generatePagination, transformData } from "../../../../utils/queryUtils.js";

// find all Articles with pagination & sorting, searching
export const findAll = async (req,res,next) => {
    // getting query params
    let {search,sort_by,sort_type,limit,page,category,author,select} = req.query;
    search = search || defaults.search;
    sort_by = sort_by || defaults.sortBy
    sort_type = sort_type || defaults.sortType
    limit = limit || defaults.limit
    page = page || defaults.page
    category = category || defaults.relation
    author = author || defaults.relation
    select = select || ''

    try {
        console.time('Time Start')
        let {articles , totalItems} = await findAllArticleService({search,sortBy : sort_by,sortType : sort_type , limit , page,categoryId : category , author , select});

        // count total Page
        let totalPage = Math.ceil(totalItems / limit)

        // generate final responses data
        let result = {
            code : 200,
            message: 'Successfully data retrived!',
            data  : articles.length > 0 ?  transformData(articles , req.baseUrl) : [], 
            links : generateAllDataHateoasLinks(req.baseUrl,page,totalPage,req.query),
            pagination : generatePagination(totalPage,page,totalItems,limit)
        }

        console.timeEnd('Time Start')
        return res.status(200).json(result)
    } catch (err) {
        let error = new Error(err.message)
        error.status = 500
        next(error)
    }

}