import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usr from "../model/user.js";

export const signin= async(req,res) =>{
    const{email,password} =req.body;
    try{
       const existingUser = await Usr.findOne({email});
       if(!existingUser) return res.status(404).json({mesage:"User doesnot exist"})
         const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
         if(!isPasswordCorrect) return res.status(404).json({message:"Invalid credential"})
         
         const token =jwt.sign({email:existingUser.email, id:existingUser._id},"test",{expiresIn:"1h"})
         res.status(200).json({result:existingUser,token});
    }catch(e){
      res.status(500).json({message:"somethng went roong"});
    }
    
}
export const signup= async(req,res) =>{
    const {email,password,confirmPassword,firstName,lastName }=req.body;
    try{
        const existingUser = await Usr.findOne({email});
        if(existingUser) return res.status(400).json({mesage:"User already exist"})
        if(password !== confirmPassword)return res.status(400).json({message:"Paasword don't match"});
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await Usr.create({email,password:hashedPassword,name: `${firstName} ${lastName}`});
        console.log(result);
        const token =jwt.sign({email:result.email, id:result._id},"test",{expiresIn:"1h"})
        res.status(200).json({result,token});
    }catch(e){
        res.status(500).json({message:"somethng went roong"});
    }

}