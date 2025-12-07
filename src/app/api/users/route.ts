import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { userService } from "../../../services/userService";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session.user || session.user.identity !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session || !session.user || session.user.identity !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const user = await userService.createUser(data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
