import mongoose from "mongoose";
import UserSchema from "../model/userSchema.js";

export const getPosts=async(req,res)=>{
    const {page} =req.query
    try{
       
        console.log(page);
        const LIMIT= 4; 
        //page is number but when it passes through query it becomes string 
        const startIndex=(Number(page)-1) *LIMIT;
        const total = await UserSchema.countDocuments({});
         const posts = await UserSchema.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);/* 1.06*/
         
         res.status(200).json({data:posts, currentPage:Number(page),NumberOfPages:Math.ceil(total/LIMIT)});
    }catch(e){
        res.status(404).json({message:e})
        console.log(e)
    }

}

export const createPosts= async(req,res)=>{
    try{
         const post = req.body;
         const newPost = new UserSchema({...post, creator:req.userId,createdAt:new Date().toISOString()});
         await newPost.save();
         res.status(201).json(newPost)
    }catch(e){
        console.log(e)
        res.status(409).json({message:e})
    }

}

export const updatePosts= async(req,res)=>{
   
       try{  
         const {id:_id} =req.params;
         const post = req.body
         if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")
         console.log(post)
         const updatedPost = await UserSchema.findByIdAndUpdate(_id,{...post,_id},{new:true})
         res.json(updatedPost);
        }catch(e){
             console.log(e);
         }


}
export const deletePosts= async(req,res)=>{
   
         const {id:_id} =req.params;
       
         if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")
       
         await UserSchema.findByIdAndRemove(_id)
         res.json({message:"Post deleted sucessfully"});


}
export const likePost= async(req,res)=>{ 
   
    const{id} =req.params;
    console.log(`i am in like userid ${req.userId}`);
    if(!req.userId) return res.json({message:"Unauthenticated"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    const post = await UserSchema.findById(id);
    const index = post.likes.findIndex((id)=>id===String(req.userId));
    if(index=== -1){
      //see in mongodb how data is storing ;
    //like the post
    post.likes.push(req.userId);
    }else{
     post.likes =post.likes.filter((id)=>id !== String(req.userId));
    }
    const updatedPost = await UserSchema.findByIdAndUpdate(id ,post, {new:true})
    res.json(updatedPost);
  }
export const commentPost= async(req,res)=>{ 
   
    const {id} =req.params;
    const {value} =req.body;
    
    const post = await UserSchema.findById(id);
    post.comments.push(value);
    //add commets
    const updatedPost = await UserSchema.findByIdAndUpdate(id,post,{new:true});
    //update in data base
    res.json(updatedPost);
  }
  export const getPostsBySearch=async(req,res)=>{
  
    const {searchQuery,tags} =req.query
    console.log("I am in beckend ");
    // console.log(req)
    // console.log(query);
    try{
        //i = ignore case
        
    console.log("I am in beckend everything fine ");
      const title = new RegExp(searchQuery,"i");
      const posts = await UserSchema.find({$or:[{title},{tags:{$in:tags.split(",")}}]})
      res.json({data:posts});
    }catch(e){
      res.status(404).json({message:e.message});
      console.log(e)
    }
}
export const getPost =async(req,res)=>{
    const {id} =req.params;
     try{
         const post= await UserSchema.findById(id);
         console.log(post)
         res.status(200).json(post);
  
     }catch(error){
          res.status(404).json({message:error.message})
     }
  }