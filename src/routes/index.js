import express from "express"
import authRoute from "./AuthRoute.js"
import postRoute from "./PostRoute.js"

const router = express.Router();

// All Endpints routes all here
router.use('/auth' , authRoute)
router.use('/articles' , postRoute)



// export for use on index file
export default router;


