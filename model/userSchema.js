import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
title:String,
message:String,
tags:[String],
selectedFile:String,
likes:{
    type:[String],
    default:[],
},
comments:{
    type:[String],
    default:[],
},
createdAt:{
    type:Date,
    default:new Date()
}
})
const User = mongoose.model("USER",userSchema)
export default User;