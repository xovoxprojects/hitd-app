import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || String(PAGE_SIZE), 10)));
    const skip = (page - 1) * limit;

    const [analyses, total] = await Promise.all([
      prisma.analysis.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.analysis.count({ where: { userId: session.user.id } }),
    ]);

    return NextResponse.json({
      analyses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      pageSize: limit,
    });
  } catch (error) {
    console.error("History API Error:", error);
    return NextResponse.json({ error: "Failed to fetch analyses" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Ensure the analysis belongs to this user before deleting
    const analysis = await prisma.analysis.findUnique({ where: { id } });
    if (!analysis || analysis.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.analysis.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Analysis Error:", error);
    return NextResponse.json({ error: "Failed to delete analysis" }, { status: 500 });
  }
}
