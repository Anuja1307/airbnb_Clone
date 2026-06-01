const Favourites = require('../models/favourites');
const HomeModel=require('../models/homes');

exports.getHomes=(req,res,next)=>{
  HomeModel.find().then((registeredHomes) =>{
      res.render('store/home-list',{homes:registeredHomes,pageTitle:"Home",isLoggedIn:req.isLoggedIn});
  })

  
};

exports.getBookings=((req,res,next)=>{
  res.render('store/bookings',{pageTitle:"Bookings",isLoggedIn:req.isLoggedIn,isLoggedIn:req.isLoggedIn})
})

exports.getIndex=((req,res,next)=>{
 HomeModel.find().then((registeredHomes)=>{
    res.render('store/index',{homes:registeredHomes,pageTitle:'Indexx',isLoggedIn:req.isLoggedIn})
  })
})

exports.getFavorites = (req, res, next) => {
    Favourites.find().populate('homeId').then(favourites => {
      const homes=favourites.map(fav=>fav.homeId).filter(home => home !== null);
      res.render('store/favourite', {homes: homes, pageTitle: 'Favorites',isLoggedIn:req.isLoggedIn})
    }).
    catch(error=>console.log(error))
  }
      
      
        

            
           
   
exports.getHomeDetails=(req,res,next)=>{
  const _id=req.params._id;
  console.log(_id);
  HomeModel.findById(_id).then((home)=>{
    
    if(!home){
      //res.redirect('/');
    }
    else{
      res.render('store/home-detail',{home:home,pageTitle:'Details',isLoggedIn:req.isLoggedIn})
    }
  })
}

exports.postFavorites = (req, res, next) => {
    console.log(req.body)
    
    Favourites.findOne({homeId: req.body.id})
        .then(existing => {
            if(existing) {
                console.log('Already in favourites')
                return Promise.resolve()
            } else {
                const fav = new Favourites({homeId: req.body.id})
                return fav.save()
            }
        })
        .then(() => res.redirect('/favorites'))
        .catch(err => console.log(err))
}

exports.postDeleteFavourites = (req, res, next) => {
    const _id = req.params._id
    console.log('delete home', _id)
    Favourites.findOneAndDelete({homeId: _id})
        .then(() => res.redirect('/favorites'))
        .catch(err => console.log("Error", err))
}
