import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(users);
}
