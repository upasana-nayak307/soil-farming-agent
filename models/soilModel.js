const mongoose=require("mongoose");

const soilSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    soilType:{
        type:String,
        required:true
    },
    phLevel:{
        type:Number,
        required:true
    },
    moistures:{
        type:Number,
        required:true
    },
    nutrients:{
        type:[String],
        required:true
    },
    characterstics:{
        type:String,
        required:true
    },
    crops:{
        type:[String],
        required:true
    },
    status:{
        type:String,
        enum:["Active","Testing","Depleted"],
        required:true
    }
});

const Soil=mongoose.model("Soil",soilSchema);

module.exports=Soil;