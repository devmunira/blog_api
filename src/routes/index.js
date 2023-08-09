import express from "express"
import authRoute from "./AuthRoute.js"
import ArticleRoute from "./ArticleRoute.js"

const router = express.Router();

// All Endpints routes all here
router.use('/auth' , authRoute)
router.use('/articles' , ArticleRoute)


// Checkout API Route Health
router.get('/health' , (req,res,next) => {
    return res.status(200).json({
        code : 200,
        message : 'API Health is okey!'
    })
})


// export for use on index file
export default router;


