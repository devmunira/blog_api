import express from "express"
import { createPostRequest, getPostRequest } from "../request/postRequest.js";
import { requestValidator } from './../middleware/requestValidator.js';
import createPost from "../api/v1/articles/controller/create.js";
import { authenticationMiddleware } from "../middleware/auth/authenticateMiddleware.js";
import { findAll } from "../api/v1/articles/controller/findAll.js";
import { find } from "../api/v1/articles/controller/find.js";

// get router function from express
const router = express.Router()


// Authntication related all routes
router.get('/' ,  getPostRequest , requestValidator , findAll)
router.post('/' , authenticationMiddleware, createPostRequest ,  requestValidator , createPost)
router.get('/:id' , find)

// export router for useages
export default router;