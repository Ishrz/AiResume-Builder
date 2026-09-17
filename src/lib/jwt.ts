import { JwtPayload } from "@/types/user.types"
import jwt from "jsonwebtoken"


export const generateToken = async (payload:JwtPayload) => {
    return jwt.sign(payload , process.env.JWT_SECRET!,{ expiresIn: "1h"})
} 

export const verifyToken = async (token:string) => {
    return jwt.verify(token, process.env.JWT_SECRET!)
}