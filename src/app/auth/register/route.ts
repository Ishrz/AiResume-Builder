import { RegisterBody } from "@/types/user.types";
import { NextRequest } from "next/server";

async function POST(req:NextRequest){

    try{
        const body: RegisterBody = await req.json()

    const {name, email, password, number} = body

    if(!name || !email || !password){
        
    }

    }catch(err){
        console.log("Error in Register route", err)
    }
}