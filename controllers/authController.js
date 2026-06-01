exports.getLogin=(req,res,next)=>{
  res.render('auth/login',{pageTitle:'Login'})
}

exports.postLogin=(req,res,next)=>{
  req.isLoggedIn=true;
  res.redirect('/')
}