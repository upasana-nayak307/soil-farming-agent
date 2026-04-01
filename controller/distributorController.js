const Distributor=require("../models/distributorModel");

exports.addDistributor=async (req,res) => {
    try {
        console.log(req.body);
        const {name,address,contact,email,products,status}=req.body;
        if(!name || !address || !contact || !email || !products || !status){
            return res.status(500).json({
                success:false,
                message:"All fields are required"
            });
        }
        const newDistributor=await Distributor.create({
            name,address,contact,email,products,status
        })
        res.status(200).json({
            success:true,
            message:"Distributor added successfully",
            distributors:newDistributor
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't add distributor",
            error:error.message
        })
    }
}

exports.getDistributors=async (req,res) => {
    try {
        const allDistributors=await Distributor.find();
        if(!allDistributors){
            return res.status(500).json({
                success:false,
                message:"Distributor is not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"All distributors fetched successfully",
            allDistributors
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't fetch all distributors",
            error:error.message
        })
    }
}

exports.updateDistributor=async (req,res) => {
    try {
        const id=req.params.id;
        const {name,address,contact,email,products,status}=req.body;
        const editDistributor=await Distributor.findByIdAndUpdate(id,{
            name,address,contact,email,products,status
        },{new : true, runValidators:true});
        if(!editDistributor){
            return res.status(500).json({
                success:false,
                message:"Distributor is not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Updated successfully",
            editDistributor
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't update",
            error:error.message
        })
    }
}

exports.deleteDistributor=async (req,res) => {
    try {
        const id=req.params.id;
        const removeDistributor=await Distributor.findByIdAndDelete(id);
        if(!removeDistributor){
            return res.status(500).json({
                success:false,
                message:"Distributor is not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Deleted successfully",
            removeDistributor
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Can't Delete",
            error:error.message
        })
    }
}