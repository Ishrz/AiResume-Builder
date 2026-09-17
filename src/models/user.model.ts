import { IUser } from "@/types/user.types"
import mongoose, { mongo } from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema<IUser>({
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
    number:{
        type:String,
    }
},{timestamps:true})


userSchema.pre("save", function(){

    if(!this.isModified("password")) return 

    this.password = bcrypt.hashSync(this.password, 7)
})

userSchema.methods.comparPassword = function(candiatePassword:string):boolean{
    return bcrypt.compareSync(candiatePassword, this.password)
}


const UserModel = mongoose.model("User", userSchema)
export default UserModel