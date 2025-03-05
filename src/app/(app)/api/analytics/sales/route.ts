import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const groupBy = searchParams.get("groupBy") || "rep"; // rep, product, region

    const dateFilter = {
      createdAt: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    };

    // Sales by Representative
    const salesByRep = await prisma.deal.groupBy({
      by: ["userId"],
      where: dateFilter,
      _sum: {
        value: true,
      },
      _count: true,
    });

    // Sales by Product Type (SignageType)
    const salesByProduct = await prisma.deal.groupBy({
      by: ["signageType"],
      where: dateFilter,
      _sum: {
        value: true,
      },
      _count: true,
    });

    // Sales by Region (using client's state)
    const salesByRegion = await prisma.deal.groupBy({
      by: ["region"],
      where: dateFilter,
      _sum: {
        value: true,
      },
      _count: true,
    });

    // Lead Source Performance
    const leadSourcePerformance = await prisma.deal.groupBy({
      by: ["leadSource"],
      where: {
        ...dateFilter,
        status: "CLOSED_WON",
      },
      _sum: {
        value: true,
      },
      _count: true,
    });

    // Commission Payouts
    const commissionPayouts = await prisma.commission.groupBy({
      by: ["userId"],
      where: dateFilter,
      _sum: {
        amount: true,
      },
    });

    const response = {
      salesByRep,
      salesByProduct,
      salesByRegion,
      leadSourcePerformance,
      commissionPayouts,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ANALYTICS_SALES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 