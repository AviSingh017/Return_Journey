const express = require("express");
const app = express();
require("dotenv").config();
const {connection} = require("./config/db");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello from backend of SMSAPP");
});

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log("Server connected with MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port ${process.env.port}`);
});