import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const type = searchParams.get('type');

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const where: any = { projectId };
    if (type) where.type = type;

    const specifications = await prisma.signageSpecification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(specifications);
  } catch (error) {
    console.error('[SPECIFICATIONS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      type,
      width,
      height,
      depth,
      unit,
      doubleSided,
      primaryMaterial,
      backingMaterial,
      printingMethod,
      finishType,
      installationType,
      mountingHeight,
      powerRequired,
      outdoorRated,
      illuminated,
      illuminationType,
      designFiles,
    } = body;

    if (!projectId || !type || !width || !height || !primaryMaterial || !printingMethod || !installationType) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const specification = await prisma.signageSpecification.create({
      data: {
        projectId,
        type,
        width,
        height,
        depth,
        unit,
        doubleSided,
        primaryMaterial,
        backingMaterial,
        printingMethod,
        finishType,
        installationType,
        mountingHeight,
        powerRequired,
        outdoorRated,
        illuminated,
        illuminationType,
        designFiles,
      },
    });

    return NextResponse.json(specification);
  } catch (error) {
    console.error('[SPECIFICATIONS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      type,
      width,
      height,
      depth,
      unit,
      doubleSided,
      primaryMaterial,
      backingMaterial,
      printingMethod,
      finishType,
      installationType,
      mountingHeight,
      powerRequired,
      outdoorRated,
      illuminated,
      illuminationType,
      designFiles,
      proofApproved,
      proofApprovedAt,
      proofApprovedBy,
    } = body;

    if (!id) {
      return new NextResponse("Specification ID required", { status: 400 });
    }

    const specification = await prisma.signageSpecification.update({
      where: { id },
      data: {
        type,
        width,
        height,
        depth,
        unit,
        doubleSided,
        primaryMaterial,
        backingMaterial,
        printingMethod,
        finishType,
        installationType,
        mountingHeight,
        powerRequired,
        outdoorRated,
        illuminated,
        illuminationType,
        designFiles,
        proofApproved,
        proofApprovedAt,
        proofApprovedBy,
      },
    });

    return NextResponse.json(specification);
  } catch (error) {
    console.error('[SPECIFICATIONS_PUT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const specId = searchParams.get('id');

    if (!specId) {
      return new NextResponse("Specification ID required", { status: 400 });
    }

    await prisma.signageSpecification.delete({
      where: { id: specId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[SPECIFICATIONS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 