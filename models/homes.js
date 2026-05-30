//core modules
const path=require('path');
const fs=require('fs');

//local modules
const rootDir=require("../utils/pathUtil");
const Favourites = require('./favourites');
const filePath=path.join(rootDir,'data','Homes.json')

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
  
    Home.fetchAll((registeredHomes)=>{
      if(this.homeId){
        registeredHomes=registeredHomes.map(home=>{
          if(home.homeId.toString()===this.homeId.toString()){
            return this;
          }
          else{
            return home;
          }
        });

      }
      else{
        this.id=Math.random().toString();
        registeredHomes.push(this);  
      }
       
      const filePath=path.join(rootDir,'data','Homes.json')
      fs.writeFile(filePath,JSON.stringify(registeredHomes),(err)=>
        {
          console.log(err);
        }
      )
    })
  
  
  }

  static fetchAll(callback){
    
    fs.readFile(filePath,(err,data)=>{
      let homes=[];
      if(!err){
        homes=JSON.parse(data);
      }
      callback(homes);
    })
  }

  static findById(homeId,callback){
    this.fetchAll((homes)=>{
      const homeFound=homes.find(home => home.homeId.toString()===homeId.toString());
      callback(homeFound)
    })

  }

  static deleteById(homeId, callback) { 
   
    
    Home.fetchAll((homes) => {
        const updatedHomes = homes.filter(home => 
            home.homeId.toString() !== homeId.toString()
        )

        fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
            if(err) console.log("Error deleting:", err)
            Favourites.deleteById(homeId,callback);
        })
    })
}
}

