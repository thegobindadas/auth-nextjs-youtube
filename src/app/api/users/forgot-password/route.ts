import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";



connectDB()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        if (!(email.trim())) {
            return NextResponse.json({error: "Email is required"}, {status: 400})
        }


        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400}) 
        }


        await  sendEmail(user._id.toString(), user.username, user.email, "RESETPASSWORD")
        


        return NextResponse.json({message: "Email sent successfully", success: true}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}