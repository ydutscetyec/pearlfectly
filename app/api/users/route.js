import { NextResponse } from "next/server";
import { addUser, findUserByEmail } from "../../../lib/users";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;
    const name = body?.name?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const existing = await findUserByEmail(email);

    if (existing) {
      return NextResponse.json(
        { error: "A user with that email already exists." },
        { status: 409 }
      );
    }

    const user = await addUser({ email, name, password });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    return NextResponse.json(
      { error: "Server error while creating account." },
      { status: 500 }
    );
  }
}