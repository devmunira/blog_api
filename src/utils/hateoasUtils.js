import { generateQueryString } from "./queryUtils.js"

// create hateoas links generator
export const generateCreateHateoasLinks = (baseUrl,id,slug) => {
    return {
        self :    `${process.env.API_BASE_URL}${baseUrl}/${id}/${slug}`,
        allItems : `${process.env.API_BASE_URL}${baseUrl}`,
    }
}


// generate all data hateoasplinks
export const generateAllDataHateoasLinks = (baseUrl,page,totalPage,q) => {
    let links =  {
        self :    `${process.env.API_BASE_URL}${baseUrl}`,
    }
    // generate nextpage links if next page exits
    if(page < totalPage){
        let query = generateQueryString(`${process.env.API_BASE_URL}${baseUrl}` , {...q , page : page + 1});
        links.nextPage = query
    }
    // generate prevpage links if prev page exits
    if(page > 1){
        let query = generateQueryString(`${process.env.API_BASE_URL}${baseUrl}` , {...q , page : page - 1});
        links.prevPage = query
    }

    return links;
}