import mongoose from "mongoose";
import short from "../model/shortUrl.js";
export const shortUrl=async(req,res)=>{
    try{
        const {full} = req.body;
        const longUrl = new short({full});
        await longUrl.save();
        res.status(201).json(longUrl);
   }catch(e){
       console.log(e)
       res.status(409).json({message:e})
   }


}
export const Url=async(req,res)=>{
    const {id} = req.param;
    try{
        const shortUrl = await short.findOne(id)
        if(shortUrl==null) return res.status(404).json({message:"no url"});
        shortUrl.save();
        res.json(shortUrl);
   }catch(e){
       console.log(e)
       res.status(409).json({message:e})
   }


}
