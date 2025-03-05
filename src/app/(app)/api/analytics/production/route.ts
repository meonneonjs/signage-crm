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

    const dateFilter = {
      createdAt: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    };

    // Timeline Adherence
    const projectTimelines = await prisma.project.groupBy({
      by: ["status"],
      where: dateFilter,
      _count: true,
      _avg: {
        completionRate: true,
      },
    });

    // Quality Issues by Type
    const qualityIssues = await prisma.projectIssue.groupBy({
      by: ["type", "severity"],
      where: {
        ...dateFilter,
        category: "QUALITY",
      },
      _count: true,
    });

    // Production Efficiency
    const productionMetrics = await prisma.productionSchedule.groupBy({
      by: ["status"],
      where: dateFilter,
      _count: true,
      _avg: {
        efficiency: true,
        completionTime: true,
      },
    });

    // Installation Success Rate
    const installationMetrics = await prisma.installationSchedule.groupBy({
      by: ["status"],
      where: dateFilter,
      _count: true,
      _avg: {
        completionRate: true,
      },
    });

    // Quality Control Checkpoints
    const qcMetrics = await prisma.qualityControlCheckpoint.groupBy({
      by: ["status"],
      where: dateFilter,
      _count: true,
      _avg: {
        score: true,
      },
    });

    const response = {
      projectTimelines,
      qualityIssues,
      productionMetrics,
      installationMetrics,
      qcMetrics,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ANALYTICS_PRODUCTION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 