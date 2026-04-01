const express=require("express");
const router=express.Router();

const {authenticateJWT}=require("../middleware/authMiddleware");
const {authorizeRole}=require("../controller/authController");
const {addCrops,getCrops,updateCrops,deleteCrop}=require("../controller/cropRecommend");

router.post('/addCrops',authenticateJWT,authorizeRole(['admin']),addCrops);
router.get('/getCrops',authenticateJWT,getCrops);
router.put('/updatecrops/:id',authenticateJWT,authorizeRole(['admin']),updateCrops);
router.delete('/removeCrop/:id',authenticateJWT,authorizeRole(['admin']),deleteCrop);

module.exports=router;