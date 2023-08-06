// create hateoas links generator
export const generateCreateHateoasLinks = (baseUrl,id,slug) => {
    return {
        self :    `${process.env.API_BASE_URL}${baseUrl}/${id}/${slug}`,
        allItems : `${process.env.API_BASE_URL}${baseUrl}`,
    }
}