//external modules
const express=require('express');

//core modules
const path=require('path');

//local modules
const rootdir=require("../utils/pathUtil");

const {homes}=require('./hostRouter');

const router=express.Router();

router.get("/",(req,res,next)=>{
  res.render('home',{homes:homes})
})

module.exports=router;