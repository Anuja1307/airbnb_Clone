//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");

const router=express.Router();

router.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootdir,"views","add_Home.html"))
})

router.post("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootdir,"views","homeAdded.html"))
})



module.exports=router;

