import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



connectDB()


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;

        // check validation
        if(!email || !password) {
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        }


        // check if user already exists
        const user = await User.findOne({email}); 

        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 404})
        }


        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }


        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});


        const response = NextResponse.json({message: "User logged in successfully", success: true}, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true
        })



        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}