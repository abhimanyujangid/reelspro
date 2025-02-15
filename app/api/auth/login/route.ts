import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
    try {
        const {email,password} = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        await connectionToDatabase();

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to login" }, { status: 500 });
    }
}