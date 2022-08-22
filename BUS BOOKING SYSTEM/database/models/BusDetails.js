const mongoose=require('mongoose')

const BusDetailsSchemea=new mongoose.Schema({
        busType:{type:String},
        depature:{type:String},
        arrival:{type:String},
        travelDate:{type:String},
        seatsAvailable:{type:Number},
        bookedSeats:{type:Array,default:[]},
        fare:{type:Number},
        serviceTax:{type:Number},
        from:{type:String},
        to:{type:String}
})

module.exports=mongoose.model('BusDetails',BusDetailsSchemea)