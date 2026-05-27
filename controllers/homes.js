const HomeModel=require('../models/homes');//model imported 

exports.getAddAddHome=(req,res,next)=>{
  res.render('add_Home',{pageTitle:"addHome"});
}


exports.postAddHome=(req,res,next)=>{
  const {homename,price,location,rating,photo}=req.body;
  const home=new HomeModel(homename,price,location,rating,photo);
  home.save();
  res.render('homeAdded',{pageTitle:'AddedHome'})

}


exports.getHomes=(req,res,next)=>{
  const registeredHomes=HomeModel.fetchAll()
  res.render('home',{homes:registeredHomes,pageTitle:"Home"})
};


