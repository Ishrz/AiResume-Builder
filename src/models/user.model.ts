import { IUser } from "@/types/user.types"
import mongoose, { Document, mongo } from "mongoose"
import bcrypt from "bcrypt"

interface UserDocument extends Omit<IUser , "_id">, Document {
    comparePassword(candidatePassword : string):boolean
}

const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type:String,
        trim:true,
        requied:[true,"Name is required"]
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        requied:[true,"Name is required"]
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Password is required"]
    },
    mobile:{
        type:String,
    }
},{timestamps:true})


userSchema.pre("save", function(){

    if(!this.isModified("password")) return 

    this.password = bcrypt.hashSync(this.password, 7)
})

userSchema.methods.comparPassword = function(candidatePassword:string):boolean{
    return bcrypt.compareSync(candidatePassword, this.password)
}


const UserModel = mongoose.model("User", userSchema)
export default UserModel