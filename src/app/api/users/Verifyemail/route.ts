import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";




connectDB()


export async function GET(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { token } = reqBody;


        const user = await User.findOne({verifyToken: token}, {verifyTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }


        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();



        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} 