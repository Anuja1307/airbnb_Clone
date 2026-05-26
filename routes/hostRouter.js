//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");

const router=express.Router();

router.use(express.urlencoded({ extended: false }))

router.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootdir,"views","add_Home.html"))
})
const homes=[];

router.post("/add-home",(req,res,next)=>{
  homes.push(req.body);
  res.redirect('/')

})



exports.hostRouter=router;   //exporting multiple objects
exports.homes=homes;

