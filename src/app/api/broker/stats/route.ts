import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/broker/stats — Returns the broker's stats for their dashboard
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brokerId = searchParams.get("brokerId");

  if (!brokerId) {
    return NextResponse.json({ error: "brokerId required" }, { status: 400 });
  }

  // Get all users referred by this broker
  const referrals = await prisma.user.findMany({
    where: { referredById: brokerId },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
    },
  });

  const planPrices: Record<string, number> = {
    growth: 9.99,
    pro: 49.99,
    elite: 499,
  };

  let totalRevenue = 0;
  let payingClients = 0;

  for (const user of referrals) {
    const price = planPrices[user.plan ?? ""] ?? 0;
    if (price > 0) {
      totalRevenue += price;
      payingClients++;
    }
  }

  const brokerCommission = totalRevenue * 0.15;

  return NextResponse.json({
    totalReferrals: referrals.length,
    payingClients,
    totalRevenue,
    brokerCommission,
    referrals,
  });
}
