exports.default=(req,res,next)=>{
  res.render('404',{pageTitle:"404",isLoggedIn:req.isLoggedIn})
}