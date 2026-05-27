//external modules
const express=require('express');

const HomeController=require("../controllers/homes")

const router=express.Router();

router.get("/",HomeController.getIndex);

router.get('/bookings',HomeController.getBookings);

router.get('/index',HomeController.getHomes);

router.get('/favorites',HomeController.getFavorites);

module.exports=router;