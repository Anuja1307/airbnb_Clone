const Favourites = require('../models/favourites');
const HomeModel=require('../models/homes');

exports.getHomes=(req,res,next)=>{
  HomeModel.fetchAll().then((registeredHomes) =>{
      res.render('store/home-list',{homes:registeredHomes,pageTitle:"Home"});
  })

  
};

exports.getBookings=((req,res,next)=>{
  res.render('store/bookings',{pageTitle:"Bookings"})
})

exports.getIndex=((req,res,next)=>{
 HomeModel.fetchAll().then((registeredHomes)=>{
    res.render('store/index',{homes:registeredHomes,pageTitle:'Indexx'})
  })
})

exports.getFavorites = ((req, res, next) => {
    Favourites.fetchAll().then(favourites => {
        console.log("Favourites from file:", favourites) 
         // what's in json file?
      favourites=favourites.map(fav=>fav.homeId); //only homeId is needed
        
       HomeModel.fetchAll().then((homes) => {
            console.log("All homes:", homes.map(h => h._id)) // what _ids exist?
            
            const filteredHomes = homes.filter(home => 
                favourites.includes(home._id.toString())
            )

            console.log("Filtered:", filteredHomes) // what's filtered?
            
            res.render('store/favourite', {homes: filteredHomes, pageTitle: 'Favorites'})
        })
    })
})

exports.getHomeDetails=(req,res,next)=>{
  const _id=req.params._id;
  console.log(_id);
  HomeModel.findById(_id).then((home)=>{
    
    if(!home){
      //res.redirect('/');
    }
    else{
      res.render('store/home-detail',{home:home,pageTitle:'Details'})
    }
  })
}

exports.postFavorites = async (req, res, next) => {
    console.log(req.body)
    const fav = new Favourites(req.body.id)
    
    try {
        await fav.save() 
        console.log('Added to favs')
        res.redirect('/favorites')
    } catch(err) {
        console.log("Error", err)
    }
}

exports.postDeleteFavourites=(req,res,next)=>{
  const _id=req.params._id;
  console.log('delete home',_id)
  Favourites.deleteById(_id).then(()=>console.log('Added to favs')).catch(
    ()=>{console.log("Error")}
  )
  .finally(()=>res.redirect('/favorites'))
}