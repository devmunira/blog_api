import express from "express"
import { getPostRequest } from "../request/postRequest.js";
import { requestValidator } from './../middleware/requestValidator.js';
import createPost from "../api/v1/articles/controller/create.js";

// get router function from express
const router = express.Router()


// Authntication related all routes
router.get('/' , getPostRequest , requestValidator , () => {})
router.post('/' , requestValidator , createPost())


// export router for useages
export default router;