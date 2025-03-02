/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingCity` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingState` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `billingZip` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `communicationFrequency` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `lifetimeValue` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `preferredContactMethod` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `segment` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `taxId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_segment_idx";

-- DropIndex
DROP INDEX "Client_type_idx";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "billingAddress",
DROP COLUMN "billingCity",
DROP COLUMN "billingState",
DROP COLUMN "billingZip",
DROP COLUMN "communicationFrequency",
DROP COLUMN "lifetimeValue",
DROP COLUMN "preferredContactMethod",
DROP COLUMN "segment",
DROP COLUMN "size",
DROP COLUMN "taxId",
DROP COLUMN "timezone",
DROP COLUMN "type",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Lead',
ADD COLUMN     "zipCode" TEXT;

-- CreateIndex
CREATE INDEX "Client_status_idx" ON "Client"("status");
