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
 console.log(process.env.SECRET_KEY);
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


//chat gpt
app.post("/", async(req,res)=>{
    try{
 const {message}= req.body;
console.log(message);
  const response =await openai.createCompletion({
   model:"text-davinci-003",
   prompt:`${message}`,
   temperature:0,
   max_tokens:3000,
   top_p:1,
   frequency_penalty:0.5,
   presence_penalty:0,
  
  })
  console.log(response);
  console.log(response.data.choices[0].text)
  res.status(200).send({
    data:response.data.choices[0].text,
  })
    }catch(e){
        console.log(e);
        res.status(500).send({e});
    }
})

const db = process.env.db
 const PORT= process.env.PORT ||3000 ;
mongoose.connect(db).then(()=>{
    console.log("conn successfull")
}).catch((e)=>{
    console.log("n conn",e)
});

app.listen(PORT,()=>{
    console.log(`server is runing ${PORT}`);
})