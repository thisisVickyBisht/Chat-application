import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI+"Live-Chat-Project")
        console.log(`MongoDB connect successully ${conn.connection.host}`)
    }
    catch(err){
        console.log(`MongoDB connection error ${err.message}`)
    }
}