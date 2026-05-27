//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");
const HomeController=require("../controllers/homes")

const router=express.Router();

router.get("/add_Home",HomeController.getAddAddHome);


router.post("/add_Home",HomeController.postAddHome);

router.get("/home-list",HomeController.getHomesHost)



exports.hostRouter=router;   //exporting multiple objects


