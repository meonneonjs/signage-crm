-- CreateEnum
CREATE TYPE "DesignStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QCStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'NEEDS_REVIEW');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('DESIGN', 'MOCKUP', 'PROOF', 'PHOTO', 'DOCUMENT', 'CONTRACT', 'INVOICE', 'OTHER');

-- CreateEnum
CREATE TYPE "FileCategory" AS ENUM ('DESIGN', 'PRODUCTION', 'INSTALLATION', 'CLIENT_FEEDBACK', 'DOCUMENTATION', 'ADMINISTRATIVE');

-- CreateEnum
CREATE TYPE "ProductionStage" AS ENUM ('DESIGN', 'PRINTING', 'FABRICATION', 'ASSEMBLY', 'QUALITY_CHECK', 'READY_FOR_INSTALLATION');

-- CreateTable
CREATE TABLE "DesignVersion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "status" "DesignStatus" NOT NULL DEFAULT 'DRAFT',
    "fileUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "description" TEXT,
    "feedback" TEXT,
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "DesignVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignChecklist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandingChecked" BOOLEAN NOT NULL DEFAULT false,
    "dimensionsChecked" BOOLEAN NOT NULL DEFAULT false,
    "colorsChecked" BOOLEAN NOT NULL DEFAULT false,
    "typosChecked" BOOLEAN NOT NULL DEFAULT false,
    "layoutChecked" BOOLEAN NOT NULL DEFAULT false,
    "materialsChecked" BOOLEAN NOT NULL DEFAULT false,
    "notesChecked" BOOLEAN NOT NULL DEFAULT false,
    "checkedBy" TEXT,
    "designVersionId" TEXT NOT NULL,

    CONSTRAINT "DesignChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityControlCheckpoint" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stage" "ProductionStage" NOT NULL,
    "status" "QCStatus" NOT NULL DEFAULT 'PENDING',
    "checkedBy" TEXT,
    "checkedAt" TIMESTAMP(3),
    "notes" TEXT,
    "images" TEXT[],
    "projectId" TEXT NOT NULL,

    CONSTRAINT "QualityControlCheckpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectFile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "category" "FileCategory" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DesignVersion_projectId_idx" ON "DesignVersion"("projectId");

-- CreateIndex
CREATE INDEX "DesignVersion_status_idx" ON "DesignVersion"("status");

-- CreateIndex
CREATE UNIQUE INDEX "DesignChecklist_designVersionId_key" ON "DesignChecklist"("designVersionId");

-- CreateIndex
CREATE INDEX "QualityControlCheckpoint_projectId_idx" ON "QualityControlCheckpoint"("projectId");

-- CreateIndex
CREATE INDEX "QualityControlCheckpoint_stage_idx" ON "QualityControlCheckpoint"("stage");

-- CreateIndex
CREATE INDEX "QualityControlCheckpoint_status_idx" ON "QualityControlCheckpoint"("status");

-- CreateIndex
CREATE INDEX "ProjectFile_projectId_idx" ON "ProjectFile"("projectId");

-- CreateIndex
CREATE INDEX "ProjectFile_type_idx" ON "ProjectFile"("type");

-- CreateIndex
CREATE INDEX "ProjectFile_category_idx" ON "ProjectFile"("category");

-- AddForeignKey
ALTER TABLE "DesignVersion" ADD CONSTRAINT "DesignVersion_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignChecklist" ADD CONSTRAINT "DesignChecklist_designVersionId_fkey" FOREIGN KEY ("designVersionId") REFERENCES "DesignVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityControlCheckpoint" ADD CONSTRAINT "QualityControlCheckpoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
