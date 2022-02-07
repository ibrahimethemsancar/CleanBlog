const mongoose=require('mongoose');
const schema=mongoose.Schema;


//create Schema

const postSchema=new schema({
    title:String,
    detail:String,
    dateCreated:{
        type:Date,
        default:Date.now,
    }
})

const Post=mongoose.model('Post',postSchema);


module.exports=Post;
