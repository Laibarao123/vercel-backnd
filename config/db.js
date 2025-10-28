import mongoose from "mongoose";
export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://laibarao777_db_user:ukqTVoOua6sgzkHt@cluster0.xvlof9f.mongodb.net/Quiz_Arena')
    .then (()=>{console.log("DB CONNECTED")})
}