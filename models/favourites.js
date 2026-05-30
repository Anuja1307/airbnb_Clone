const { ObjectId } = require("mongodb")
const { getDB } = require("../utils/database")

module.exports = class Favourites {
    constructor(homeId) {
        this.homeId = homeId.toString()
    }

async save() {
    const db = getDB()
    console.log("Saving homeId:", this.homeId)
    
    const existing = await db.collection('favourites').findOne({homeId: this.homeId}) // ✅ await
    console.log("Existing:", existing)
    
    if(!existing) {
        const result = await db.collection('favourites').insertOne({homeId: this.homeId})
        console.log("Inserted:", result)
        return result
    }
    return Promise.resolve()
}
    static fetchAll() {
        const db = getDB()
        return db.collection('favourites').find().toArray()
    }

    static deleteById(del_id) {
        const db = getDB()
        console.log('Deleting id:', del_id)
        return db.collection('favourites').deleteOne({homeId: del_id.toString()})
    }
}