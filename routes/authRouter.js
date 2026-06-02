const express=require('express');

const authController=require("../controllers/authController");


const router=express.Router();

router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.post('/logout',authController.postLogout);
router.get('/signUp',authController.getSignUp);
router.post('/signUp',authController.postSignUp);



module.exports=router;