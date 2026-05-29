import { NextResponse } from "next/server";
import { addUser, findUserByEmail } from "../../../lib/users";

export async function POST(request) {
  const body = await request.json();
  const email = body?.email?.trim();
  const password = body?.password;
  const name = body?.name?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
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
}
