const mongo=require('mongodb');

const mongoClient=mongo.MongoClient;

const mongo_URL="mongodb+srv://root:root@airbnb.6j5lqiw.mongodb.net/?appName=airbnb"

let _db;

const mongoConnection=(callback)=>{
  mongoClient.connect(mongo_URL).then(client =>{
    _db=client.db('airbnb')
    callback(client);

  }).catch((err)=>{
    console.log("Error");
  })
}

const getDB=()=>{
  return _db;
}

exports.mongoConnect=mongoConnection;
exports.getDB=getDB;