//core modules
const path=require('path');
const fs=require('fs');

//local modules
const rootDir=require("../utils/pathUtil");
const { json } = require('express');

const filePath=path.join(rootDir,'data','Favourites.json');

module.exports=class Favourites{
   static getFavourites(callback){
     fs.readFile(filePath,(err,data)=>{
        callback(!err?JSON.parse(data):[]);
     })
   }

   static addToFavourites(homeId){
      Favourites.getFavourites((favourites)=>{
        if(favourites.includes(homeId)){
          console.log("Home already marked as favourite");
        }
        else{
          favourites.push(homeId);
          fs.writeFile(filePath,JSON.stringify(favourites),err=>{
            console.log("Error in writing to file");
          })

        }
      })

   }
   static deleteById(delHomeId,callback){
    Favourites.getFavourites(favourites=>{
      const favs=favourites.filter(fav=>{
       return fav.toString() !== delHomeId.toString();
      })
      fs.writeFile(filePath, JSON.stringify(favs), err => {
          if(err) console.log("Error in writing to file", err)
          callback();
})
    })
   }

}
