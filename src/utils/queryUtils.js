// generate sortType
export const generateSortType = (sortType) => {
    return sortType === 'desc' ? -1 : 1
}

// generate query string
export const generateQueryString = (path , query) => {
    let q =  Object.keys(query).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&');
    return `${path}?${q}`
}

// generate pagination
export const generatePagination = (totalPage,page,totalItems,limit) => {
    let pagination = {
        totalItems,
        currentPage : page,
        limit,
        totalPage
    }
    // generate next page number based on totalPage
    if(page < totalPage) pagination.next = page + 1
    // generate next page number based on totalPage
    if(page > 1) pagination.prev = page - 1
    return pagination;
}


// populate request data
export const transformData = (items = [] , baseURL = '', selection='' , deselect='') => {
    return items.length > 0 && items.map((item) => {
        delete item._doc.__v;
        return {
            ...item._doc,
            links : `${process.env.API_BASE_URL}${baseURL}/${item._id}/${item.slug}`,
        }
    })
}