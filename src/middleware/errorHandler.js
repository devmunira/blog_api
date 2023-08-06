export const notFoundHandellar = (_req,_res,next) => {
    const error = new Error('404 Not Found')
    error.status = 404
    next(error)
}



export const globalErrorHandellar = (error,_req,res,_next)=>{
    console.log(error)

    if(error.status){
        res.status(error.status).json({
            code : error.status,
            message : error.message
        })
    }else if(error?.errors?.length > 0){
        res.status(400).json(error)
    }  
    else{
        res.status(500).json({message : error.message})
    }
};
