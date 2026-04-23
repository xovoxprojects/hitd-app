import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL = "hello@hitd.ai";

// POST /api/admin/grant-plan — Grant a plan and credits to a user
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, planName, credits, externalRevenue } = await req.json();
  
  if (!userId || !planName || credits === undefined) {
    return NextResponse.json({ error: "userId, planName, and credits are required" }, { status: 400 });
  }

  try {
    const dataToUpdate: any = { plan: planName, credits: Number(credits) };
    if (externalRevenue) {
      dataToUpdate.externalRevenue = { increment: Number(externalRevenue) };
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: updated.id, 
        email: updated.email, 
        plan: updated.plan, 
        credits: updated.credits,
        externalRevenue: updated.externalRevenue
      } 
    });
  } catch (e: any) {
    console.error("Error granting plan:", e);
    return NextResponse.json({ error: "Error al actualizar plan y créditos del usuario" }, { status: 500 });
  }
}
