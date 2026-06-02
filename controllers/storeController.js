
const HomeModel=require('../models/homes');
const User=require("../models/user");

exports.getHomes=(req,res,next)=>{
  HomeModel.find().then((registeredHomes) =>{
      res.render('store/home-list',{homes:registeredHomes,pageTitle:"Home",isLoggedIn:req.isLoggedIn,user:req.user});
  })

  
};

exports.getBookings=((req,res,next)=>{
  res.render('store/bookings',{pageTitle:"Bookings",isLoggedIn:req.isLoggedIn,isLoggedIn:req.isLoggedIn,user:req.user})
})

exports.getIndex=((req,res,next)=>{
 HomeModel.find().then((registeredHomes)=>{
    res.render('store/index',{homes:registeredHomes,pageTitle:'Indexx',isLoggedIn:req.isLoggedIn,user:req.user})
  })
})

exports.getFavorites = async (req, res, next) => {
    const userId=req.user._id;
    const user=await User.findById(userId).populate('favourites');
    res.render('store/favourite', {homes: user.favourites, pageTitle: 'Favorites',isLoggedIn:req.isLoggedIn,user:req.user})
  }

   
exports.getHomeDetails=(req,res,next)=>{
  const _id=req.params._id;
  console.log(_id);
  HomeModel.findById(_id).then((home)=>{
    
    if(!home){
      //res.redirect('/');
    }
    else{
      res.render('store/home-detail',{home:home,pageTitle:'Details',isLoggedIn:req.isLoggedIn,user:req.user})
    }
  })
}

exports.postFavorites = async (req, res, next) => {
    console.log(req.body);
    const homeId=req.body.id;
    const userId=req.user._id;
    const user=await User.findById(userId);
    if(user.favourites.includes(homeId)){
      console.log("Already added to favourites");
    }
    else{
      user.favourites.push(homeId);
      await user.save();

    }
    return res.redirect('/favorites');
}

exports.postDeleteFavourites = async (req, res, next) => {
    const homeId = req.params._id
    
    const userId=req.user._id;
    const user=await User.findById(userId);
    user.favourites=user.favourites.filter(fav=>fav.toString()!=homeId.toString());
    await user.save();
    res.redirect('/favorites')
    
}
