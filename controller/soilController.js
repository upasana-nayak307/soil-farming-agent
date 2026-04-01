const Soil=require("../models/soilModel");

exports.addSoil=async (req,res) => {
    try {
        console.log(req.body);
        const {name,soilType,phLevel,moistures,nutrients,characterstics,crops,status}=req.body;
        const soil=await Soil.create({
            name,soilType,phLevel,moistures,nutrients,characterstics,crops,status
        })
        if(!name || !soilType || !phLevel || !moistures || !nutrients || !characterstics || !crops || !status){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            })
        }
        res.status(200).json({
            success:true,
            message:"Soil added successfully",
            soil
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't add soil",
            error:error.message
        })
    }
}

exports.showallSoil=async (req,res) => {
    try {
        const soils=await Soil.find();
        if(!soils){
            return res.status(200).json({
                success:false,
                message:"Soil can't be fetched",
            });
        }
        res.status(200).json({
            success:true,
            message:"Soil fetched successfully",
            soils
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't fetch all soil",
            error:error.message
        })
    }
}


exports.updateSoil=async (req,res) => {
    try {
        console.log(req.body);
        const id=req.params.id;
        const {name,soilType,phLevel,moistures,nutrients,characterstics,crops,status}=req.body;
        const editSoil=await Soil.findByIdAndUpdate(id,{
            name,soilType,phLevel,moistures,nutrients,characterstics,crops,status
        },{new : true,runValidators : true});
        if(!editSoil){
            return res.status(400).json({
                success:false,
                message:"Soil is not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Soil updated successfully",
            editSoil
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Update failed",
            error:error.message
        })
    }
}

exports.deleteSoil=async (req,res) => {
    try {
        const id=req.params.id;
        const removeSoil=await Soil.findByIdAndDelete(id);
        if(!removeSoil){
            return res.status(400).json({
                success:false,
                message:"Soil is not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Soil deleted successfully",
            removeSoil
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to delete",
            error:error.message
        })
    }
}