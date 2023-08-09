import { globalUtils } from "../../../../utils/index.js"
import {findById} from "../../../../libs/articles/index.js"

// find single articles by id
export const find = async (req,res,next) => {
    const {id} = req.params
    let {expand , select} = req.query

    try {
        if(!id)  throw new Error('Invalid Id params!')
        if(expand) expand = globalUtils.stringToArray(expand)
        if(select) select = globalUtils.stringToArray(select)


        // get data
        const article = await findById({id,expand,select})

        // modify data
        let response;
        if(article){
            response = {
                code : 200,
                message : 'Article Retrive Sucessfully',
                data : article
            } 
           return res.status(200).json(response)
        }else{
            response = {
                code : 404,
                message : 'Article Not Found!',
            } 
            return res.status(404).json(response)
        }
    } catch (err) {
        console.log(err)
        const error = new Error(err.message)
        error.status = 500
        next(error)
    }
}
