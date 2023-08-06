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