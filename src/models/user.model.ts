import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:[true,"Name is required"]
    },
    email:{
        type:String,
        unique:true,
        requied:[true,"Name is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    number:{
        type:String,
    }
},{timestamps:true})


const UserModel = mongoose.model("User", userSchema)
export default UserModel