import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, username, email, password } = body;

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: { name, username, email } },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating user", detail: error.message },
      { status: 500 }
    );
  }
}
