import express from "express"
import { createArticleRequest, getArticleRequest } from "../request/articleRequest.js";
import { requestValidator } from '../middleware/requestValidator.js';
import { authenticationMiddleware } from "../middleware/auth/authenticateMiddleware.js";
import articleController from "../api/v1/articles/index.js"

// get router function from express
const router = express.Router()


// Authntication related all routes
router.get('/' ,  getArticleRequest , requestValidator , articleController.findAll)
router.post('/' , authenticationMiddleware, createArticleRequest ,  requestValidator , articleController.createArticle)
router.get('/:id' , articleController.find)

// export router for useages
export default router;