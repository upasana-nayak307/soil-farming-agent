const express=require("express");
const router=express.Router();

const {authenticateJWT}=require("../middleware/authMiddleware");
const {authorizeRole}=require("../controller/authController");
const {addSoil,showallSoil,updateSoil,deleteSoil}=require("../controller/soilController");

router.post('/addSoil',authenticateJWT,authorizeRole(['admin']),addSoil);
router.get('/getSoil',authenticateJWT,showallSoil);
router.put('/updateSoil/:id',authenticateJWT,authorizeRole(['admin']),updateSoil);
router.delete('/removeSoil/:id',authenticateJWT,authorizeRole(['admin']),deleteSoil);

module.exports=router;