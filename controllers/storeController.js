const Favourites = require('../models/favourites');
const HomeModel=require('../models/homes');

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

exports.getFavorites = ((req, res, next) => {
    Favourites.getFavourites((favourites) => {
        console.log("Favourites from file:", favourites) // what's in json file?
        
        HomeModel.fetchAll((homes) => {
            console.log("All homes:", homes.map(h => h.homeId)) // what homeIds exist?
            
            const filteredHomes = homes.filter(home => 
                favourites.includes(home.homeId.toString())
            )

            console.log("Filtered:", filteredHomes) // what's filtered?
            
            res.render('store/favourite', {homes: filteredHomes, pageTitle: 'Favorites'})
        })
    })
})

exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log(homeId);
  HomeModel.findById(homeId,(home)=>{
    if(!home){
      //res.redirect('/');
    }
    else{
      res.render('store/home-detail',{home:home,pageTitle:'Details'})
    }
  })
}

exports.postFavorites=((req,res,next)=>{
  console.log(req.body)
  Favourites.addToFavourites(req.body.id)
  res.redirect('/favorites')
})

exports.postDeleteFavourites=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log('delete home',homeId)
  Favourites.deleteById(homeId,(error)=>{
    if(error){
        console.log("error in controller");
    }
    res.redirect('/favorites');
  })
}