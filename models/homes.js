//core modules
const path=require('path');
const fs=require('fs');

//local modules
const rootDir=require("../utils/pathUtil");

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
        registeredHomes.push(this);
        const filePath=path.join(rootDir,'data','Homes.json')
        fs.writeFile(filePath,JSON.stringify(registeredHomes),(err)=>
          {
               console.log(err);
        }
      )
    })
  
  
  }

  static fetchAll(callback){
    const filePath=path.join(rootDir,'data','Homes.json')
    fs.readFile(filePath,(err,data)=>{
      let homes=[];
      if(!err){
        homes=JSON.parse(data);
      }
      callback(homes);
    })
  }
}