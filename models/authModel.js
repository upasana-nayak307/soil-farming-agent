const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","farmer"],
        default:"farmer",
        required:true
    }
},{timeStamps:true});

// model
const User=mongoose.model("User",userSchema);

module.exports=User;