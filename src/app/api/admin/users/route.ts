import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users — Returns all users for the admin panel
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const adminCheck = searchParams.get("adminKey");
  
  // Simple server-side check - the real auth check is in the page component
  if (!adminCheck) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      credits: true,
      role: true,
      brokerCode: true,
      referredById: true,
    },
    orderBy: { role: "asc" },
  });

  return NextResponse.json({ users });
}
