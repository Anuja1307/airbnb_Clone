const registeredHomes=[]; //fake db

module.exports=class Home{
  constructor(homename,price,location,rating,photo){
    this.homename=homename;
    this.price=price;
    this.location=location;
    this.rating=rating;
    this.photo=photo;
  }

  save(){
    registeredHomes.push(this);
  }
  
  static fetchAll(){
    return registeredHomes;
  }
}