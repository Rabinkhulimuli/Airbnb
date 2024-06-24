const mongoose= require("mongoose")

const placeSchema=new mongoose.Schema({

    title:String,
    address:String,
    photo:[String],
    discription:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuest:Number,
}) 

const modelSchema= mongoose.model("PlaceModel",placeSchema)
module.exports=modelSchema