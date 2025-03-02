import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const scheduleId = formData.get('scheduleId') as string;
    const checklist = JSON.parse(formData.get('checklist') as string);
    const photos = formData.getAll('photos') as File[];

    if (!scheduleId || !checklist || !photos.length) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upload photos to blob storage
    const uploadPromises = photos.map(async (photo) => {
      const blob = await put(photo.name, photo, {
        access: 'public',
      });
      return blob.url;
    });

    const photoUrls = await Promise.all(uploadPromises);

    // Create project files for the photos
    const projectId = (await prisma.installationSchedule.findUnique({
      where: { id: scheduleId },
      select: { projectId: true }
    }))?.projectId;

    if (!projectId) {
      return new NextResponse("Installation schedule not found", { status: 404 });
    }

    // Create project files for before/after photos
    await prisma.projectFile.createMany({
      data: photoUrls.map((url, index) => ({
        name: `Installation Photo ${index + 1}`,
        type: 'PHOTO',
        url,
        size: 0, // Size information not available from blob URL
        uploadedBy: userId,
        category: 'INSTALLATION',
        projectId,
      }))
    });

    // Update installation schedule status
    await prisma.installationSchedule.update({
      where: { id: scheduleId },
      data: {
        status: 'COMPLETED',
      }
    });

    // Create a quality control checkpoint
    await prisma.qualityControlCheckpoint.create({
      data: {
        stage: 'READY_FOR_INSTALLATION',
        status: 'PASSED',
        checkedBy: userId,
        checkedAt: new Date(),
        notes: 'Installation verification completed',
        images: photoUrls,
        projectId,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[INSTALLATION_VERIFY]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 