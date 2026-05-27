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


exports.getHomes=(req,res,next)=>{
  HomeModel.fetchAll((registeredHomes)=>{
      res.render('store/home-list',{homes:registeredHomes,pageTitle:"Home"});
  })
  
};

exports.getBookings=((req,res,next)=>{
  res.render('store/bookings',{pageTitle:"Bookings"})
})

exports.getIndex=((req,res,next)=>{
  HomeModel.fetchAll((registeredHomes)=>{
    res.render('store/index',{homes:registeredHomes,pageTitle:'Indexx'})
  })
})

exports.getFavorites=((req,res,next)=>{
  HomeModel.fetchAll((homes)=>{
    res.render('store/favourite',{homes:homes,pageTitle:'Favourites'})
  })
})


exports.getHomesHost=(req,res,next)=>{
  HomeModel.fetchAll((homes)=>{
    res.render('host/host-home-list',{homes:homes,pageTitle:'Host Homes'})
  })
}


