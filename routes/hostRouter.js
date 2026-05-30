//core modules
const path=require('path');

//external modules
const express=require('express');

//local
const rootdir=require("../utils/pathUtil");
const HostController=require("../controllers/hostController")

const router=express.Router();

router.get("/add_Home",HostController.getAddHome);


router.post("/add_Home",HostController.postAddHome);

router.get("/home-list",HostController.getHomesHost)

router.get("/edit_Home/:homeId",HostController.getEditHome);

router.post("/edit_Home",HostController.postEditHome);

router.post("/delete_home/:homeId",HostController.postDeleteHome);



exports.hostRouter=router;   //exporting multiple objects


