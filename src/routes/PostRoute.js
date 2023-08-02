import express from "express"
import { getPostRequest } from "../request/postRequest.js";
import { requestValidator } from './../middleware/requestValidator.js';
import { getAllArticles } from "../controllers/PostController.js";

// get router function from express
const router = express.Router()

// Authntication related all routes
router.get('/' , getPostRequest , requestValidator , getAllArticles)


// export router for useages
export default router;