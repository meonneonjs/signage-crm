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

    // Customer Retention (Repeat Business)
    const customerProjects = await prisma.customer.findMany({
      where: dateFilter,
      select: {
        id: true,
        businessName: true,
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    // Average Projects per Customer
    const avgProjectsPerCustomer = customerProjects.reduce(
      (acc, curr) => acc + curr._count.projects,
      0
    ) / customerProjects.length;

    // Customer Satisfaction (Reviews)
    const reviewMetrics = await prisma.review.groupBy({
      by: ["rating"],
      where: dateFilter,
      _count: true,
    });

    // Calculate average rating
    const totalReviews = reviewMetrics.reduce((acc, curr) => acc + curr._count, 0);
    const weightedSum = reviewMetrics.reduce(
      (acc, curr) => acc + curr.rating * curr._count,
      0
    );
    const averageRating = totalReviews > 0 ? weightedSum / totalReviews : 0;

    // Referral Sources
    const referralMetrics = await prisma.customer.groupBy({
      by: ["referralSource"],
      where: dateFilter,
      _count: true,
    });

    // Customer Communication Frequency
    const communicationMetrics = await prisma.communication.groupBy({
      by: ["type"],
      where: dateFilter,
      _count: true,
    });

    // Customer Follow-up Effectiveness
    const followUpMetrics = await prisma.followUp.groupBy({
      by: ["status"],
      where: dateFilter,
      _count: true,
    });

    const response = {
      customerProjects,
      avgProjectsPerCustomer,
      reviewMetrics,
      averageRating,
      referralMetrics,
      communicationMetrics,
      followUpMetrics,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[ANALYTICS_CUSTOMERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 