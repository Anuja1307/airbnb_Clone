const db=require("../utils/database");


module.exports=class Home{
  constructor(homename,price,location,rating,photo,description){
    this.homename=homename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photoURL=photo;
    this.description=description;
  }

  save() {
    if(this.homeId){
      return db.execute("Update Homes set homename=? ,price=?,location=?,rating=?,photoURL=?,description=? where homeId=? ",[this.homename,this.price,this.location,this.rating,this.photoURL,this.description,this.homeId]);
    }
    return db.execute(
        "INSERT INTO homes (homename, price, location, rating, photoURL, description) VALUES (?,?,?,?,?,?)",
        [this.homename, this.price, this.location, this.rating, this.photoURL, this.description]
    )
}

  static fetchAll(){
    return db.execute("SELECT * from homes");
  }

  static findById(homeId){
      return db.execute("SELECT * FROM homes where homeId=?",[homeId]);
  
  }

  static deleteById(homeId, callback) { 
    return db.execute("DELETE FROM homes where homeId=(?)",[homeId]);
   
}
}

