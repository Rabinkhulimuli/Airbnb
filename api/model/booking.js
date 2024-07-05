const mongoose=require('mongoose')

const bookingSchema = new mongoose.Schema({
place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'PlaceModel'},
user:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'} ,
name:String,
phone:Number,
checkIn:String,
checkOut:String,
guest:Number,
price:Number
})

const BookSchema=mongoose.model('BookModel',bookingSchema) 
module.exports= BookSchema