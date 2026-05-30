const { ObjectId } = require("mongodb");
const {getDB}=require("../utils/database");


module.exports=class Home{
  constructor(homename,price,location,rating,photo,description){
    this.homename=homename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photoURL=photo;
    this.description=description;
    if(this._id){
      this._id=_id;
     }
  }

  save() {
    const db=getDB();
    if(this._id){
      const updatedFields={
        "homename":this.homename,
        "price":this.price,
        "location":this.location,
        "rating":this.rating,
        "photoURL":this.photoURL,
        "description":this.description
      }
      return db.collection('homes').updateOne({_id:new ObjectId(String(this._id))},{$set:updatedFields})
      
    }

    return db.collection('homes').insertOne(this);

}

  static fetchAll(){
    const db=getDB();
    return db.collection('homes').find().toArray();
  }

  static findById(_id){
    const db=getDB();
    console.log('The id is',_id)
    return db.collection('homes').findOne({_id:new ObjectId(String(_id))})
  
  }

  static deleteById(_id) { 
 
    const db=getDB();
    console.log('The id is',_id)
    return db.collection('homes').deleteOne({_id:new ObjectId(String(_id))})
  
   
}
}

