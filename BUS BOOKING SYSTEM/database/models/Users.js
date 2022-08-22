const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phNumber:{type:String},
    password:{type:String},
    dateOfBirth:{type:String},
    gender:{type:String,enum: ["male", "female"]}

})
module.exports=mongoose.model('users',UserSchema)