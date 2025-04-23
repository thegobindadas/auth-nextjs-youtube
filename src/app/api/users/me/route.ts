import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";



connectDB()


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findOne({_id: userId}).select('-password');

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }


        return NextResponse.json({message: "user found",  user, success: true}, {status: 200})
         
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}