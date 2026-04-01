const mongoose=require("mongoose");

const cropSchema=mongoose.Schema({
    name:{
        type:[String],
        required:true
    },
    soil:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Soil",
        required:true
    },
    cropDuration:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    season:{
        type:String,
        enum:["Summer","Rainy","Winter","Autumn","Spring"],
        required:true
    },
    waterRequire:{
        type:String,
        enum:["low","high","medium"],
        required:true
    },
    status:{
        type:String,
        enum:["Active","Pending","Inactive"],
        required:true
    }
},{timeStamps:true});

const Crop=mongoose.model("Crop",cropSchema);

module.exports=Crop;