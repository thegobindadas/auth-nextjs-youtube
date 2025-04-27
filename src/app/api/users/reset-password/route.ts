import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";



connectDB()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        
        const { token, newPassword, confirmPassword } = reqBody

        if(!token) {
            return NextResponse.json({error: "Token is required"}, {status: 400})
        }

        if(!newPassword || !confirmPassword) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }

        if(newPassword !== confirmPassword) {
            return NextResponse.json({error: "Passwords do not match. Please try again"}, {status: 400})
        }


        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

        if(!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)


        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()


        
        return NextResponse.json({message: "Password reset successfully", success: true}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}