import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messagesRoute from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js";

const app=express();
const PORT=process.env.PORT || 2000
dotenv.config();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoute);
app.use("/api/users",userRoutes);


app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
})