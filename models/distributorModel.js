const mongoose=require("mongoose");

const distributorSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    products:{
        type:[String],
        required:true
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        required:true
    }
},{timeStamps:true});

const Distributor=mongoose.model("Distributor",distributorSchema);

module.exports=Distributor;