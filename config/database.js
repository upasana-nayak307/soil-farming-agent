const mongoose=require("mongoose");
const database=async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Soil');
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection error:", error);
    }
}
module.exports=database;