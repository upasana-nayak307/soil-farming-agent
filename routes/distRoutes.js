const express=require("express");
const router=express.Router();


const {authorizeRole}=require("../controller/authController");
const {authenticateJWT}=require("../middleware/authMiddleware");
const {addDistributor,getDistributors,updateDistributor,deleteDistributor}=require("../controller/distributorController");

router.post("/addDistributor",authenticateJWT,authorizeRole(['admin']),addDistributor);
router.get("/getDistributors",authenticateJWT,getDistributors);
router.put("/updateDistributors/:id",authenticateJWT,authorizeRole(['admin']),updateDistributor);
router.delete("/deleteDistributor/:id",authenticateJWT,authorizeRole(['admin']),deleteDistributor);

module.exports=router;