const Crop=require("../models/cropRecommend");

exports.addCrops=async (req,res) => {
    try {
        console.log(req.body);
        const {name,soil,cropDuration,description,season,waterRequire,status}=req.body;
        if(!name || !soil || !cropDuration || !description || !season || !waterRequire || !status){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            });
        }
        const newCrop=await Crop.create({
            name,soil,cropDuration,description,season,waterRequire,status
        });
        res.status(200).json({
            success:true,
            message:"Crop added successfully",
            crops:newCrop
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't add crop",
            error:error.message
        })
    }
}

exports.getCrops=async (req,res) => {
    try {
        const allCrops=await Crop.find().populate("soil","soilType crops").exec();
        if(!allCrops){
            return res.status(500).json({
                success:false,
                message:"All crops can't be fetched",
            });
        }
        res.status(200).json({
            success:true,
            message:"All crops fetched successfully",
            allCrops
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't fetch all crops",
            error:error.message
        })
    }
}

exports.updateCrops=async (req,res) => {
    try {
        const id=req.params.id;
        const {name,soil,cropDuration,description,season,waterRequire,status}=req.body;
        const editCrop=await Crop.findByIdAndUpdate(id,{
            name,soil,cropDuration,description,season,waterRequire,status
        },{new:true,runValidators:true});
        if(!editCrop){
            return res.status(500).json({
                success:false,
                message:"Can't be edited"
            })
        }
        res.status(200).json({
            success:true,
            message:"Crop updated successfully",
            editCrop
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't edit the crops",
            error:error.message
        })
    }
}

exports.deleteCrop=async (req,res) => {
    try {
        const id=req.params.id;
        const removeCrop=await Crop.findByIdAndDelete(id);
        if(!removeCrop){
            return res.status(500).json({
                success:false,
                message:"Deletion failed"
            })
        }
        res.status(200).json({
            success:true,
            message:"Deleted succesffuly",
            removeCrop
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Deletion failed",
            error:error.message
        })
    }
}