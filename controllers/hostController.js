const HomeModel=require('../models/homes');//model imported 

exports.getAddAddHome=(req,res,next)=>{
  res.render('host/add_Home',{pageTitle:"addHome"});
}


exports.postAddHome=(req,res,next)=>{
  const {homename,price,location,rating,photo}=req.body;
  const home=new HomeModel(homename,price,location,rating,photo);
  home.save();
  res.render('host/homeAdded',{pageTitle:'AddedHome'})

}


exports.getHomesHost=(req,res,next)=>{
  HomeModel.fetchAll((homes)=>{
    res.render('host/host-home-list',{homes:homes,pageTitle:'Host Homes'})
  })
}


