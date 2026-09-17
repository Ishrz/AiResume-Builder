import mongoose from "mongoose"


export const dbConnect = async () => {
    try{

        const db = await mongoose.connect(process.env.MONGO_URI!)
        console.log("Database is connected")

    }catch(err){
        console.log("Error in connecting to DB", err)
    }
}