import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "hello@hitd.ai";

// POST /api/admin/brokers — Promote user to broker
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, brokerCode } = await req.json();
  if (!userId || !brokerCode) {
    return NextResponse.json({ error: "userId and brokerCode are required" }, { status: 400 });
  }

  // Normalize code: uppercase, no spaces
  const code = brokerCode.trim().toUpperCase().replace(/\s+/g, "");

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: "broker", brokerCode: code },
    });
    return NextResponse.json({ success: true, user: { id: updated.id, email: updated.email, brokerCode: updated.brokerCode } });
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "Ese código de broker ya está en uso. Elige otro." }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
  }
}

// DELETE /api/admin/brokers — Remove broker status
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: "user", brokerCode: null },
  });

  return NextResponse.json({ success: true });
}
