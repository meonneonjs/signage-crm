import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const customers = await prisma.customer.findMany({
      where: {
        businessName: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        _count: {
          select: {
            contacts: true,
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("[CUSTOMERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      industry,
      website,
      address,
      city,
      state,
      zipCode,
      contacts,
    } = body;

    if (!businessName) {
      return new NextResponse("Business name is required", { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        businessName,
        industry,
        website,
        address,
        city,
        state,
        zipCode,
        contacts: {
          create: contacts,
        },
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error("[CUSTOMERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 