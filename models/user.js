const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
  firstName:{required:true,type:String},
  lastName:String,
  email:{required:true,type:String,unique:true},
  password:{required:true,type:String},
  userType:{type:String,required:true,enum:['guest','host']},
  favourites:[{type:mongoose.Schema.Types.ObjectId,ref:'Home'}]
})




module.exports=mongoose.model('User',userSchema);




