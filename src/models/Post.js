import { Schema, model } from "mongoose";

const postSchema = new Schema({
    authorId : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    categoryId :{
        type: Schema.Types.ObjectId,
        ref : 'Category',
        require : true 
    },
    title : {
        type: String,
        require: true,
        unique: true,
        maxlength: 50,
    },
    slug : {
        type: String,
        require: true,
        unique: true,
    },
    body : {
        type:  String,
    },
    cover : {
        type: String,
        require : true
    },
    status : {
        type : String,
        enum : ['publish' , 'unpublish' , 'draft'],
        default : 'publish'
    }


},{timestamps : true})


postSchema.statics.findByTitleOrBody = function(val){
    // if(val){
        return this.find({title : val})
    // }

}


const Post = model('Post' , postSchema)
export default Post;