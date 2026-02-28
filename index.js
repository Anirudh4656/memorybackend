import express from "express";
const app= express();
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import routes from "./router/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./router/user.js";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    
 });

 const openai = new OpenAIApi(configuration);
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({limit:"100mb" , extended:true}))
app.use(express.json());
app.use(cors());
dotenv.config();



app.use("/posts",routes)
app.use("/user",userRoutes)

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Hello from Codex",
    })
})



const db = process.env.db
 const PORT= process.env.PORT ?? 5000 ;
mongoose.connect(db).then(()=>{
    console.log("conn successfull")
}).catch((e)=>{
    console.log("n conn",e)
});

app.listen(PORT,()=>{
    console.log(`server is runing ${PORT}`);
})