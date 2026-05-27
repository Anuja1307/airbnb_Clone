//external modules
const express=require('express');

const HomeController=require("../controllers/homes")

const router=express.Router();

router.get("/",HomeController.getHomes);

module.exports=router;