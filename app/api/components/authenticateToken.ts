import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function authenticateToken(req: NextRequest, res: NextResponse, next: any) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWTSECRETKEY || "");
    NextResponse.json({ message: "This is protected data" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Invalid token", detail: err.message },
      { status: 401 }
    );
  }
}

module.exports = authenticateToken;
