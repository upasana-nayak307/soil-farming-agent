const express=require("express");
const app=express();
const cors=require("cors");
const database=require("./config/database");
let port=8080;

// connecting the database
database();
app.use(cors({
    origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
const authRoutes=require("./routes/authRoutes");
app.use('/api/auth',authRoutes);

const soilRoutes=require("./routes/soilRoutes");
app.use("/api/soil",soilRoutes);

const cropRoutes=require("./routes/cropRoutes");
app.use("/api/crops",cropRoutes);

const distRoutes=require("./routes/distRoutes");
app.use("/api/distributors",distRoutes);

app.listen(port,()=>{
    console.log("App is listening at the port:",port);
});