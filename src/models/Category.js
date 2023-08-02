import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name : {
        type: String,
        require: true,
        unique: true,
        maxlength: 20,
    },
    slug : {
        type: String,
        require: true,
        unique: true,
    }

},{timestamps : true})

const Category = model('Category' , categorySchema)
export default Category;