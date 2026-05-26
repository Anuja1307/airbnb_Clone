//external modules
const express=require('express');

//core modules
const path=require('path');

//local modules
const rootdir=require("../utils/pathUtil");

const router=express.Router();

router.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootdir,"views","home.html"));
})

module.exports=router;