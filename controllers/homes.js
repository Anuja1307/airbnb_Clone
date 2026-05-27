
const homes=[];
homes.length = 0;


exports.getAddAddHome=(req,res,next)=>{
  res.render('add_Home',{pageTitle:"addHome"});
}


exports.postAddHome=(req,res,next)=>{
  homes.push(req.body);
  res.render('homeAdded',{pageTitle:'AddedHome'})

}


exports.getHomes=(req,res,next)=>{
  res.render('home',{homes:homes,pageTitle:"Home"})
};


exports.homes=homes;