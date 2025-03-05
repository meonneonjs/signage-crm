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
    const file = formData.get('file') as File;
    const projectId = formData.get('projectId') as string;
    const versionNumber = parseInt(formData.get('versionNumber') as string);
    const description = formData.get('description') as string;

    if (!file || !projectId || !versionNumber) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upload file to blob storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // Generate thumbnail if it's an image
    let thumbnailUrl = null;
    if (file.type.startsWith('image/')) {
      thumbnailUrl = blob.url;
    }

    // Create design version in database
    const designVersion = await prisma.designVersion.create({
      data: {
        versionNumber,
        description,
        fileUrl: blob.url,
        thumbnailUrl,
        status: 'DRAFT',
        projectId,
        designChecklist: {
          create: {
            brandingChecked: false,
            dimensionsChecked: false,
            colorsChecked: false,
            typosChecked: false,
            layoutChecked: false,
            materialsChecked: false,
            notesChecked: false,
          }
        }
      },
      include: {
        designChecklist: true
      }
    });

    return NextResponse.json(designVersion);
  } catch (error) {
    console.error('[DESIGN_UPLOAD]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 