import Article from "../../models/Article.js";
import { generateSortType, globalUtils } from "../../utils/index.js";


// create Article
export const createArticleService = async (
    {title = '' ,
    body = '',
    cover = '',
    status = 'publish', 
    categoryId = '', 
    authorId = '',
   }) => {
    // create new instance of Article
    const article = new Article();
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



// count Article
export const countArticlesService = (filter) => {
    return Article.count(filter);
}


// find all Articles
export const findAllArticleService = async (
    {search='',sortBy='updatedAt',sortType='asc',limit=10,page=1,categoryId='',author='' , select=''}
) => {
    // populate sortType val for query
    let sortTypeForDB = generateSortType(sortType);

    // create selected item array for select specific items from db
    let selectedArray;
    if(select){
        selectedArray = select.split(',').map((item) => item.trim());
    }else{
        selectedArray = ['title' , 'slug' , 'cover' , 'status' , 'authorId' , 'categoryId' , 'createdAt']
    }

    // destructured filter options for query
    let filter = {title : {$regex : search , $options : 'i'}}
    if(categoryId) filter.categoryId = categoryId
    if(author) filter.authorId = author

    // send request to db with all query params
    let articles = await Article.find(filter)
    .select(selectedArray)
    .sort({[sortBy] : sortTypeForDB})
    .skip(page * limit - limit)
    .limit(limit)
    .populate(selectedArray.includes('authorId') ? {
        path   : 'authorId',
        select : 'username email'
        //TODO: populate category
    } : '');


    // count total Articles based on search query params only, not apply on pagination
    let totalItems = await countArticlesService(filter) ;

    return {
        articles,
        totalItems
    }

}


// find Article by Id
export const findById = async ({id = '' , expand = [] , select=[]}) => {
    if(!id) throw new Error('Invalid Id Params!')

    let article = Article.findById(id);
    if(select.length > 0) article =  await article.select(select);


    if(article){
        if(expand.includes('authorId')) await article.populate({path : 'authorId' , select : '-__v, -password'})
        if(expand.includes('categoryId')) await article.populate({path : 'categoryId'})
        if(expand.includes('comments')) await article.populate({path : 'comments'})
    }
    
    return article ? article._doc : null;
}

