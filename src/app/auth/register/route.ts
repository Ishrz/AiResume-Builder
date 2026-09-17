import { RegisterBody } from "@/types/user.types";
import { ApiResponse } from "@/types/response.type";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoDB";
import UserModel from "@/models/user.model";
import { generateToken } from "@/lib/jwt";
async function POST(req:NextRequest){

    try{

        await dbConnect()

        const body: RegisterBody = await req.json()

    const {name, email, password, mobile} = body

    if(!name || !email || !password){
        return NextResponse.json<ApiResponse>({
            message:"All fields are required",
            success:false
        },{ status:400})
    }

    const isExisted = await UserModel.findOne({email})

    if(isExisted){
        return NextResponse.json<ApiResponse>({
            message:"User is already existed",
            success:false
        },{status:409})
    }

    const newUser = await UserModel.create({
        name,
        email,
        password,
        mobile
    })

    const response = NextResponse.json<ApiResponse>({
        message:"User created successfully",
        success:true,
        data:{
            user:{
                name:newUser.name,
                email:newUser.email,
                _id:newUser._id
            }
        }
    },{status:201})

    const token = await generateToken({userId: newUser._id.toString()})

    response.cookies.set("token", token , {
        httpOnly:true,
        sameSite: "lax",
        maxAge: 60* 60 * 1000
    })

    return response

    
    }catch(err){
        return NextResponse.json<ApiResponse>({
            message:"something went wrong",
            success:false,
            error:{err}
        },{status:500})
    }
}