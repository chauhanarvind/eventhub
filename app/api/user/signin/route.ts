import dbConnect from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function POST(req: NextRequest, res: any, next: any) {
  await dbConnect();

  try {
    console.log("inside api");
    const body = await req.json();
    const { username, password } = body;

    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    //create and sign JWT
    const payload = { user: { id: user.username } };

    //generate token
    const token = jwt.sign(payload, process.env.JWTSECRETKEY || "", {
      expiresIn: "24h",
    });

    console.log("token==", token);

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 201 }
    );
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid credentials", detail: error.message },
      { status: 401 }
    );
  }
}
