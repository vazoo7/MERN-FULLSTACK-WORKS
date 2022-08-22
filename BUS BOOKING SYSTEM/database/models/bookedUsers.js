const mongoose=require("mongoose")

const BookedSeats=new mongoose.Schema({
    name:{type:String},
    gender:{type:String},
    busId:{type:String},
    userId:{type:String},
    selectedSeats:{type:Array,default:[]},
    amountPaid:{type:Number},
})
module.exports=mongoose.model('bookingHistory',BookedSeats)