//external modules
const express=require('express');

const storeController=require("../controllers/storeController")

const router=express.Router();

router.get("/",storeController.getIndex);

router.get('/bookings',storeController.getBookings);

router.get('/index',storeController.getHomes);

router.get('/favorites',storeController.getFavorites);

router.post('/favourites',storeController.postFavorites)

router.post('/favourites/delete/:_id',storeController.postDeleteFavourites);

router.get('/homes/:_id',storeController.getHomeDetails)

module.exports=router;