const User=require("../models/authModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require('dotenv').config()

exports.register=async (req,res) => {
    try {
        console.log(req.body);
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if (name.trim().length < 3) {
            return res.status(400).json({
                success:false,
                message: "Name too short"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success:false,
                message: "Invalid email format"
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                success:false,
                message: "Password too short"
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"This email already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:newUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Registration failed",
            error:error.message
        })
    }
}

exports.login=async (req,res) => {
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const loginUser=await User.findOne({email});
        console.log(loginUser);
        if(!loginUser){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const checkPassword= await bcrypt.compare(password,loginUser.password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        // creating jwt
        const token=jwt.sign({
            id:loginUser._id,
            role:loginUser.role
        },process.env.JWT_SECRET,{expiresIn:"1d"});

        res.status(200).json({
            success:true,
            message:"Login Successfull",
            token,
            user:{
                id:loginUser._id,
                name: loginUser.name,
                role:loginUser.role,
                email:loginUser.email
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
}

exports.authorizeRole= (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' }); // Forbidden
    }
    next();
  };
};