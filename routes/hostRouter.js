//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");
const HomeController=require("../controllers/homes")

const router=express.Router();

router.get("/add-home",HomeController.getAddAddHome);


router.post("/add-home",HomeController.postAddHome);



exports.hostRouter=router;   //exporting multiple objects


