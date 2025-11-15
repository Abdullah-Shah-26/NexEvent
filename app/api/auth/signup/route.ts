import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongoose";
import { User } from "@/database";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { message: "Email, password, and role are required" },
        { status: 400 }
      );
    }

    if (!["guest", "organizer"].includes(role)) {
      return NextResponse.json(
        { message: "Invalid role. Must be 'guest' or 'organizer'" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || "",
      role,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
