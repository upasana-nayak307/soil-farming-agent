const express=require("express");
const router=express.Router();

const {register,login , authorizeRole}=require("../controller/authController");
const {authenticateJWT}=require("../middleware/authMiddleware");

router.post('/register',register);
router.post('/login',login)

router.get('/admin-dashboard',authenticateJWT,authorizeRole(['admin']),(req,res)=>{
    res.json({ message: 'Welcome to the admin dashboard, Admin!' });
});
module.exports=router;