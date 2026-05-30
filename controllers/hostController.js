const HomeModel=require('../models/homes');//model imported 

exports.getAddHome=(req,res,next)=>{
  res.render('host/edit_Home',{pageTitle:"addHome",editing:false});
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

exports.getEditHome=(req,res,next)=>{
  const homeId=req.params.homeId ;
  const editing=req.query.editing === "true" ;
  console.log(homeId,editing);
  HomeModel.findById(homeId,(home)=>{
    if(!home){
      console.log("Homme not available for editing")
      return res.redirect("/host/home-list")
    }
     console.log(home)
     res.render("host/edit_Home",{home:home,editing:editing,pageTitle:"edit Home"});
  })
 
  
}

exports.postEditHome=(req,res,next)=>{

  const {homeId,homename,price,location,rating,photo}=req.body;
  const home=new HomeModel(homename,price,location,rating,photo);
  home.homeId=homeId;
  console.log(home,homeId);
  console.log('In post of edit home');
  home.save();
  res.redirect('/host/home-list');


}

exports.postDeleteHome=(req,res,next)=>{
  const homeId=req.params.homeId;

  console.log(homeId);
  HomeModel.deleteById(homeId,(error)=>{
    if(error){
      console.log("error occurred",error);
    }
    res.redirect("/host/home-list");
  })
}


