const mongoose= require("mongoose")

const placeSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    location:String,
    addedPhoto:[String],
    description:String,
    perk:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuest:Number,
}) 

const modelSchema= mongoose.model("PlaceModel",placeSchema)
module.exports=modelSchema