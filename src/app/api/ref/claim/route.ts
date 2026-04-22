import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// POST /api/ref/claim — Called after sign-in to link a referral cookie to the new user
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const refCode = cookieStore.get("hitd_ref")?.value;

  if (!refCode) {
    return NextResponse.json({ message: "No referral cookie found" });
  }

  // Check user doesn't already have a referrer
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { referredById: true },
  });

  if (user?.referredById) {
    return NextResponse.json({ message: "User already has a referrer" });
  }

  // Find the broker
  const broker = await prisma.user.findUnique({
    where: { brokerCode: refCode.toUpperCase() },
    select: { id: true },
  });

  if (!broker) {
    return NextResponse.json({ message: "Broker not found for code: " + refCode });
  }

  // Link them (don't let a broker refer themselves)
  if (broker.id !== session.user.id) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { referredById: broker.id },
    });
  }

  return NextResponse.json({ success: true });
}
