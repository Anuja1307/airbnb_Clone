//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");

const router=express.Router();

router.use(express.urlencoded({ extended: false }))

router.get("/add-home",(req,res,next)=>{
  res.render('add_Home',{pageTitle:"addHome"});
})
const homes=[];

router.post("/add-home",(req,res,next)=>{
  homes.push(req.body);
  res.render('homeAdded',{pageTitle:'AddedHome'})

})



exports.hostRouter=router;   //exporting multiple objects
exports.homes=homes;

