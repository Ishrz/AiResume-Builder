import { generateToken } from "@/lib/jwt";
import { dbConnect } from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import { ApiResponse } from "@/types/response.type";
import { LoginBody } from "@/types/user.types";
import { NextRequest , NextResponse } from "next/server";


async function POST(req: NextRequest){
    try {

        await dbConnect()

        const body : LoginBody = await req.json()

        const {email , password } = body

        if(!email || !password) {
            return NextResponse.json<ApiResponse>({
                success:false,
                message:"All fields are required"
            }, { status:400})
        }

        const isExisted = await UserModel.findOne({email})

        if(!isExisted){
            return NextResponse.json<ApiResponse>({
                message:"User not found",
                success:false
            },{status:404})
        }

        const passIsValid = await isExisted.comparePassword(isExisted.password.toString())

        if(!passIsValid){
            return NextResponse.json<ApiResponse>({
                message:"Invalid credentials",
                success:false
            },{status:401})
        }

        const token  = await generateToken({userId:isExisted._id.toString()})

        
        const response = NextResponse.json<ApiResponse>({
            message:"User logged in successfully",
            success:true,
            data:{
                user:{
                    _id:isExisted._id,
                    email:isExisted.email,
                    name:isExisted.name
                }
            }
        },{status:200}) 

        response.cookies.set("token", token, {
            httpOnly:true,
            sameSite:"lax",
            maxAge: 60 * 60 * 1000
        })

        return response

        
    } catch (error) {
        return NextResponse.json<ApiResponse>({
            message:"Something went wrong",
            success:false,
            error:{error}
        },{status:500})
    }
}