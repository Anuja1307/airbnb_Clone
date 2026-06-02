const mongoose=require('mongoose');


const homeSchema=new mongoose.Schema({
  homename:{type:String,required:true},
  price:{type:Number,required:true},
  location:{type:String,required:true},
  rating:{type:Number,required:true},
  photoURL:String,
  description:String
})

//homeSchema.pre('findOneAndDelete',async function(next){
// const homeId=this.getQuery()._id;
// favourites.findOneAndDelete(homeId);

//})


module.exports=mongoose.model('Home',homeSchema);




