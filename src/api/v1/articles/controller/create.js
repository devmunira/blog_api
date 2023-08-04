// Create New Post 
const createPost = (req,res,next) => {
    const {categoryId,title,body,cover,status} = req.body;
    try {
        
    } catch (err) {
        next(err)  
    }
}

export default createPost;