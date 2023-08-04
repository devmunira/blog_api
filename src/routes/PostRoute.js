import express from "express"
import { getPostRequest } from "../request/postRequest.js";
import { requestValidator } from './../middleware/requestValidator.js';

// get router function from express
const router = express.Router()

// Authntication related all routes
router.get('/' , getPostRequest , requestValidator , () => {})


// export router for useages
export default router;