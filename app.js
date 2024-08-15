const express=require("express");
const mongoose= require("./config/db");

const app= express();

app.use(express.json());

const PORT= process.env.PORT || 5000;

app.use("/",require("./routes/blogRoutes"))
app.listen(PORT,()=>{
    console.log("Server Running")
})