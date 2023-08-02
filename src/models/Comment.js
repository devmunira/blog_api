import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    postId :{
        type: Schema.Types.ObjectId,
        ref : 'Post',
        require : true 
    },
    comment : {
        type: String,
        require: true,
        maxlength: 100,
    }

},{timestamps : true})

const Comment = model('Comment' , commentSchema)
export default Comment;