/*
  Warnings:

  - You are about to alter the column `description` on the `Activity` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `name` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2048)`.
  - You are about to alter the column `name` on the `ProjectFile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url` on the `ProjectFile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2048)`.
  - You are about to alter the column `description` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- DropIndex
DROP INDEX "Document_uploadedById_idx";

-- DropIndex
DROP INDEX "LeadActivity_leadId_idx";

-- DropIndex
DROP INDEX "ProjectFile_projectId_idx";

-- DropIndex
DROP INDEX "ProjectFile_type_idx";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "url" SET DATA TYPE VARCHAR(2048);

-- AlterTable
ALTER TABLE "ProjectFile" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "url" SET DATA TYPE VARCHAR(2048);

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- CreateIndex
CREATE INDEX "Activity_createdAt_type_idx" ON "Activity"("createdAt", "type");

-- CreateIndex
CREATE INDEX "Communication_type_status_createdAt_idx" ON "Communication"("type", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Document_type_uploadedById_idx" ON "Document"("type", "uploadedById");

-- CreateIndex
CREATE INDEX "Lead_status_score_idx" ON "Lead"("status", "score");

-- CreateIndex
CREATE INDEX "Lead_lastContactedAt_status_idx" ON "Lead"("lastContactedAt", "status");

-- CreateIndex
CREATE INDEX "LeadActivity_createdAt_leadId_idx" ON "LeadActivity"("createdAt", "leadId");

-- CreateIndex
CREATE INDEX "Project_createdAt_status_idx" ON "Project"("createdAt", "status");

-- CreateIndex
CREATE INDEX "ProjectFile_projectId_type_idx" ON "ProjectFile"("projectId", "type");

-- CreateIndex
CREATE INDEX "Task_status_dueDate_idx" ON "Task"("status", "dueDate");

-- CreateIndex
CREATE INDEX "Task_assignedToId_status_idx" ON "Task"("assignedToId", "status");
