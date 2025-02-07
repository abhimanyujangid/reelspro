import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";


export async function POST(request: NextRequest) {
    try {
        const {email,password} = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        await connectionToDatabase();


        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const newUser = await User.create({email,password});


        if(!newUser){
            return NextResponse.json({ message: "User creation failed" }, { status: 400 });
        }

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });



    } catch (error) {
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }
}