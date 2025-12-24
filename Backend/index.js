import express from 'express';
const app=express();
import dotenv from 'dotenv'
import cors from 'cors'
import videoRoute from './Router/videoRoute.js'
dotenv.config({})

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies/auth headers
  }));

app.use(express.json())

app.use('/api/v1',videoRoute);
app.get('/',(req,res)=>{

 
});

app.listen(8000,()=>{
    console.log("server started on 8000 port");
})