const HomeModel=require('../models/homes');//model imported 

exports.getAddHome=(req,res,next)=>{
  res.render('host/edit_Home',{pageTitle:"addHome",editing:false});
}
exports.postAddHome = (req, res, next) => {
    const {homename, price, location, rating, photo, description} = req.body
    const home = new HomeModel(homename, price, location, rating, photo, description)
    
    home.save()
        .then((home) => {
            console.log("Home saved")
            res.redirect('/host/home-list')
        })
        .catch((err) => {
            console.log(err) 
            res.redirect('/host/home-list')
        })
}


exports.getHomesHost=(req,res,next)=>{
  HomeModel.fetchAll().then((homes)=>{
    res.render('host/host-home-list',{homes:homes,pageTitle:'Host Homes'})
  })
}

exports.getEditHome=(req,res,next)=>{
  const _id=req.params._id ;
  const editing=req.query.editing === "true" ;
  console.log(_id,editing);
  HomeModel.findById(_id).then((home)=>{
    
    if(!home){
      console.log("Homme not available for editing")
      return res.redirect("/host/home-list")
    }
     console.log(home)
     res.render("host/edit_Home",{home:home,editing:editing,pageTitle:"edit Home"});
  })
 
  
}

exports.postEditHome=(req,res,next)=>{

  const {_id,homename,price,location,rating,photo,description}=req.body;
  const home=new HomeModel(homename,price,location,rating,photo,description);
  home._id=_id;
  console.log(home,_id);
  console.log('In post of edit home');
  home.save().then(()=>{
      res.redirect('/host/home-list');
  }).catch(err=>{
    console.log(err);
  })


}

exports.postDeleteHome=(req,res,next)=>{
  const _id=req.params._id;

  console.log(_id);
  HomeModel.deleteById(_id).then(()=>
    {
      res.redirect("/host/home-list");
    })
    .catch((error)=>{
    if(error){
      console.log("error occurred",error);
    }
    
  })
}


