const HomeModel=require('../models/homes');//model imported 

exports.getAddHome=(req,res,next)=>{
  res.render('host/edit_Home',{pageTitle:"addHome",editing:false});
}
exports.postAddHome = (req, res, next) => {
    const {homename, price, location, rating, photo, description} = req.body
    const home = new HomeModel(homename, price, location, rating, photo, description)
    
    home.save()
        .then(() => {
            res.redirect('/host/home-list') 
        })
        .catch((err) => {
            console.log(err) 
        })
}


exports.getHomesHost=(req,res,next)=>{
  HomeModel.fetchAll().then(([homes])=>{
    res.render('host/host-home-list',{homes:homes,pageTitle:'Host Homes'})
  })
}

exports.getEditHome=(req,res,next)=>{
  const homeId=req.params.homeId ;
  const editing=req.query.editing === "true" ;
  console.log(homeId,editing);
  HomeModel.findById(homeId).then(([homes])=>{
    const home=homes[0];
    if(!home){
      console.log("Homme not available for editing")
      return res.redirect("/host/home-list")
    }
     console.log(home)
     res.render("host/edit_Home",{home:home,editing:editing,pageTitle:"edit Home"});
  })
 
  
}

exports.postEditHome=(req,res,next)=>{

  const {homeId,homename,price,location,rating,photo,description}=req.body;
  const home=new HomeModel(homename,price,location,rating,photo,description);
  home.homeId=homeId;
  console.log(home,homeId);
  console.log('In post of edit home');
  home.save().then(()=>{
      res.redirect('/host/home-list');
  }).catch(err=>{
    console.log(err);
  })


}

exports.postDeleteHome=(req,res,next)=>{
  const homeId=req.params.homeId;

  console.log(homeId);
  HomeModel.deleteById(homeId).then(()=>
    {
      res.redirect("/host/home-list");
    })
    .catch((error)=>{
    if(error){
      console.log("error occurred",error);
    }
    
  })
}


