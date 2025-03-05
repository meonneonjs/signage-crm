-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('INSTAGRAM', 'WEBSITE', 'TRADE_SHOW', 'IN_PERSON', 'PERMIT_PORTAL', 'REFERRAL', 'OTHER');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'PROPOSAL_SENT', 'CONVERTED', 'LOST');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "DealStage" AS ENUM ('INITIAL_CONTACT', 'DESIGN_CONSULTATION', 'PROPOSAL', 'DESIGN_APPROVAL', 'PRODUCTION', 'INSTALLATION', 'FOLLOW_UP', 'CLOSED_WON', 'CLOSED_LOST', 'CONTRACT_SENT', 'CONTRACT_SIGNED', 'PERMIT_PENDING', 'PERMIT_APPROVED');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('SELF_GENERATED', 'COMPANY_PROVIDED', 'OVERRIDE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'VOID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "LeadScore" AS ENUM ('COLD', 'WARM', 'HOT');

-- CreateEnum
CREATE TYPE "SignageType" AS ENUM ('MONOCHROME_STANDARD', 'RGB_LED', 'RAINBOW_LED', 'INDOOR', 'OUTDOOR', 'VEHICLE_WRAP', 'DIGITAL_DISPLAY', 'WAYFINDING', 'ARCHITECTURAL', 'BANNER', 'WINDOW_GRAPHICS', 'TRADE_SHOW', 'CUSTOM');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ALUMINUM_COMPOSITE', 'ACRYLIC', 'ALUMINUM', 'FOAM_BOARD', 'CORRUGATED_PLASTIC', 'FABRIC', 'GLASS', 'WOOD', 'STEEL', 'PVC', 'DIBOND', 'LED_SMD', 'LED_THT', 'LED_COB', 'LED_MATRIX', 'REFLECTIVE_VINYL', 'TRANSLUCENT_VINYL', 'PERFORATED_VINYL', 'ANTI_GRAFFITI_LAMINATE', 'PHOTOLUMINESCENT', 'OTHER');

-- CreateEnum
CREATE TYPE "PrintingMethod" AS ENUM ('DIGITAL', 'SCREEN_PRINTING', 'UV_PRINTING', 'SUBLIMATION', 'LASER_CUTTING', 'CNC_ROUTING', 'VINYL_CUTTING', 'HAND_PAINTING');

-- CreateEnum
CREATE TYPE "InstallationType" AS ENUM ('WALL_MOUNTED', 'FREESTANDING', 'SUSPENDED', 'VEHICLE', 'WINDOW', 'GROUND_MOUNTED', 'PYLON', 'MONUMENT');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('MATERIALS', 'LABOR', 'EQUIPMENT', 'PERMITS', 'TRAVEL', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SALES_REP', 'INSTALLER', 'ACCOUNTANT', 'MARKETING');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('PLANNED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED');

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

-- CreateEnum
CREATE TYPE "CommunicationType" AS ENUM ('EMAIL', 'SMS', 'CALL', 'MEETING');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'SIGNED', 'EXPIRED', 'DECLINED');

-- CreateEnum
CREATE TYPE "MarketingType" AS ENUM ('DISPLAY_AD', 'SEARCH_AD', 'SOCIAL_AD', 'VIDEO_AD', 'EMAIL_CAMPAIGN', 'CONTENT_MARKETING', 'INFLUENCER_CAMPAIGN', 'OTHER');

-- CreateEnum
CREATE TYPE "MarketingPlatform" AS ENUM ('META', 'GOOGLE', 'LINKEDIN', 'TWITTER', 'TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'EMAIL', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('IMAGE', 'VIDEO', 'CAROUSEL', 'STORY', 'REEL', 'TEXT', 'HTML');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AdSetStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AdStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'REJECTED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED', 'SPAM');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyName" TEXT,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "source" "LeadSource" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "priority" "LeadPriority" NOT NULL DEFAULT 'MEDIUM',
    "score" "LeadScore" NOT NULL DEFAULT 'COLD',
    "lastContactedAt" TIMESTAMP(3),
    "nextFollowUpDate" TIMESTAMP(3),
    "leadValue" DOUBLE PRECISION,
    "conversionProbability" DOUBLE PRECISION,
    "industry" TEXT,
    "employeeCount" INTEGER,
    "annualRevenue" DOUBLE PRECISION,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "budget" DOUBLE PRECISION,
    "timeline" TIMESTAMP(3),
    "requirements" TEXT,
    "notes" TEXT,
    "tags" TEXT[],
    "assignedToId" TEXT,
    "convertedToId" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "leadId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LeadActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "status" TEXT,
    "title" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'SALES_REP',
    "managerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "companyName" TEXT,
    "industry" TEXT,
    "website" TEXT,
    "userId" TEXT NOT NULL,
    "lastContactDate" TIMESTAMP(3),
    "nextFollowUpDate" TIMESTAMP(3),
    "customFields" JSONB,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "notes" TEXT,
    "state" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Lead',
    "zipCode" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientNote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ClientNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING',
    "budget" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "actualCost" DOUBLE PRECISION,
    "clientId" TEXT NOT NULL,
    "margin" DOUBLE PRECISION,
    "progress" DOUBLE PRECISION,
    "customerId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "closeProbability" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expectedCloseDate" TIMESTAMP(3),
    "stage" "DealStage" NOT NULL DEFAULT 'INITIAL_CONTACT',
    "proposedAmount" DOUBLE PRECISION,
    "negotiatedAmount" DOUBLE PRECISION,
    "finalAmount" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentTerms" TEXT,
    "designRequirements" TEXT,
    "siteLocation" TEXT,
    "installationNotes" TEXT,
    "permitRequired" BOOLEAN NOT NULL DEFAULT false,
    "permitNumber" TEXT,
    "permitStatus" TEXT,
    "permitSubmissionDate" TIMESTAMP(3),
    "permitApprovalDate" TIMESTAMP(3),
    "proposalSentDate" TIMESTAMP(3),
    "contractSentDate" TIMESTAMP(3),
    "contractSignedDate" TIMESTAMP(3),
    "estimatedStartDate" TIMESTAMP(3),
    "estimatedCompletionDate" TIMESTAMP(3),
    "customFields" JSONB,
    "leadId" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealActivity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "dealId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DealActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "CommissionType" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionPayment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommissionPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" "CampaignStatus" NOT NULL DEFAULT 'ACTIVE',
    "type" TEXT NOT NULL,
    "budget" DOUBLE PRECISION,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignParticipant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaignId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CampaignParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignMetrics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "campaignId" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roi" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "CampaignMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMilestone" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTask" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "assignedToId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectIssue" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reportedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedDate" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" TEXT NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "size" INTEGER,
    "uploadedById" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignageSpecification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SignageType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "depth" DOUBLE PRECISION,
    "unit" TEXT NOT NULL DEFAULT 'inches',
    "weight" DOUBLE PRECISION,
    "doubleSided" BOOLEAN NOT NULL DEFAULT false,
    "primaryMaterial" "MaterialType" NOT NULL,
    "backingMaterial" "MaterialType",
    "finishType" TEXT,
    "printingMethod" "PrintingMethod" NOT NULL,
    "resolution" TEXT,
    "pixelPitch" DOUBLE PRECISION,
    "brightness" INTEGER,
    "refreshRate" INTEGER,
    "colorProfile" TEXT,
    "installationType" "InstallationType" NOT NULL,
    "mountingHeight" DOUBLE PRECISION,
    "mountingAngle" DOUBLE PRECISION,
    "clearanceNeeded" DOUBLE PRECISION,
    "powerRequired" BOOLEAN NOT NULL DEFAULT false,
    "voltageRequired" DOUBLE PRECISION,
    "powerConsumption" DOUBLE PRECISION,
    "controlSystem" TEXT,
    "outdoorRated" BOOLEAN NOT NULL DEFAULT false,
    "ipRating" TEXT,
    "operatingTemp" JSONB,
    "windLoadRating" DOUBLE PRECISION,
    "illuminated" BOOLEAN NOT NULL DEFAULT false,
    "illuminationType" TEXT,
    "colorTemperature" INTEGER,
    "certifications" TEXT[],
    "warrantyPeriod" INTEGER,
    "designFiles" TEXT[],
    "proofApproved" BOOLEAN NOT NULL DEFAULT false,
    "proofApprovedAt" TIMESTAMP(3),
    "proofApprovedBy" TEXT,
    "maintenanceInterval" INTEGER,
    "cleaningInstructions" TEXT,
    "replacementParts" JSONB,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SignageSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialInventory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "materialType" "MaterialType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "minimumStock" DOUBLE PRECISION NOT NULL,
    "reorderPoint" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT,
    "leadTime" INTEGER,
    "location" TEXT,

    CONSTRAINT "MaterialInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "designStage" JSONB,
    "printingStage" JSONB,
    "fabricationStage" JSONB,
    "assemblyStage" JSONB,
    "assignedMachine" TEXT,
    "materialStatus" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProductionSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallationSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "estimatedDuration" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "siteAddress" TEXT NOT NULL,
    "siteContact" TEXT,
    "sitePhone" TEXT,
    "accessInstructions" TEXT,
    "equipmentNeeded" TEXT[],
    "crewSize" INTEGER NOT NULL DEFAULT 2,
    "permitRequired" BOOLEAN NOT NULL DEFAULT false,
    "permitNumber" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "InstallationSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" VARCHAR(1000),
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,
    "assignedToId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "category" "ExpenseCategory" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTeamMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCommunication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectCommunication_pkey" PRIMARY KEY ("id")
);

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
    "name" VARCHAR(255) NOT NULL,
    "type" "FileType" NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "size" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "category" "FileCategory" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "CommunicationType" NOT NULL,
    "status" TEXT NOT NULL,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "clientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT,
    "contactId" TEXT,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSettings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "telephonyProvider" TEXT,
    "telephonyApiKey" TEXT,
    "telephonyApiSecret" TEXT,
    "telephonyPhone" TEXT,
    "emailProvider" TEXT,
    "emailApiKey" TEXT,
    "emailFromAddress" TEXT,

    CONSTRAINT "SystemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIntegration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "googleConnected" BOOLEAN NOT NULL DEFAULT false,
    "googleEmail" TEXT,
    "googleRefreshToken" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "calendarSyncEnabled" BOOLEAN NOT NULL DEFAULT true,
    "emailSyncEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "industry" TEXT,
    "employeeCount" INTEGER,
    "annualRevenue" DOUBLE PRECISION,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "customFields" JSONB,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "title" TEXT,
    "department" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warranty" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Warranty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
    "validUntil" TIMESTAMP(3),
    "signedAt" TIMESTAMP(3),
    "signedBy" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "contactId" TEXT,
    "dealId" TEXT,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "importance" TEXT NOT NULL DEFAULT 'medium',
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingCampaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "MarketingType" NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "budget" DOUBLE PRECISION NOT NULL,
    "actualSpend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "platform" "MarketingPlatform" NOT NULL,
    "targetAudience" JSONB,
    "goals" TEXT[],
    "tags" TEXT[],
    "assignedToId" TEXT,

    CONSTRAINT "MarketingCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingMetrics" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "reach" INTEGER NOT NULL DEFAULT 0,
    "engagement" INTEGER NOT NULL DEFAULT 0,
    "spend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cpc" DOUBLE PRECISION,
    "cpm" DOUBLE PRECISION,
    "ctr" DOUBLE PRECISION,
    "roas" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketingMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingContent" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "mediaUrl" TEXT,
    "callToAction" TEXT,
    "landingPage" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "performance" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketingContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdSet" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "AdSetStatus" NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "targeting" JSONB NOT NULL,
    "placements" TEXT[],
    "bidStrategy" TEXT,

    CONSTRAINT "AdSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "adSetId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "AdStatus" NOT NULL,
    "preview" TEXT,
    "mediaUrls" TEXT[],
    "headline" TEXT NOT NULL,
    "primaryText" TEXT,
    "description" TEXT,
    "callToAction" TEXT,
    "destinationUrl" TEXT,
    "metrics" JSONB,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdMessage" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "platform" "MarketingPlatform" NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MessageStatus" NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT,
    "response" TEXT,
    "respondedAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "AdMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DealToDocument" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DealToDocument_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DocumentToExpense" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DocumentToExpense_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DocumentToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DocumentToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DocumentToProjectCommunication" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DocumentToProjectCommunication_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MaterialInventoryToSignageSpecification" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MaterialInventoryToSignageSpecification_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_InstallationScheduleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InstallationScheduleToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TaskDependencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TaskDependencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProjectCommunicationToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectCommunicationToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_convertedToId_key" ON "Lead"("convertedToId");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");

-- CreateIndex
CREATE INDEX "Lead_score_idx" ON "Lead"("score");

-- CreateIndex
CREATE INDEX "Lead_lastContactedAt_idx" ON "Lead"("lastContactedAt");

-- CreateIndex
CREATE INDEX "Lead_status_score_idx" ON "Lead"("status", "score");

-- CreateIndex
CREATE INDEX "Lead_lastContactedAt_status_idx" ON "Lead"("lastContactedAt", "status");

-- CreateIndex
CREATE INDEX "LeadActivity_createdAt_leadId_idx" ON "LeadActivity"("createdAt", "leadId");

-- CreateIndex
CREATE INDEX "LeadActivity_userId_idx" ON "LeadActivity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Client_userId_idx" ON "Client"("userId");

-- CreateIndex
CREATE INDEX "Client_status_idx" ON "Client"("status");

-- CreateIndex
CREATE INDEX "ClientNote_clientId_idx" ON "ClientNote"("clientId");

-- CreateIndex
CREATE INDEX "ClientNote_userId_idx" ON "ClientNote"("userId");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- CreateIndex
CREATE INDEX "Project_clientId_idx" ON "Project"("clientId");

-- CreateIndex
CREATE INDEX "Project_createdAt_status_idx" ON "Project"("createdAt", "status");

-- CreateIndex
CREATE INDEX "Material_projectId_idx" ON "Material"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_projectId_key" ON "Deal"("projectId");

-- CreateIndex
CREATE INDEX "Deal_leadId_idx" ON "Deal"("leadId");

-- CreateIndex
CREATE INDEX "Deal_assignedToId_idx" ON "Deal"("assignedToId");

-- CreateIndex
CREATE INDEX "Deal_stage_idx" ON "Deal"("stage");

-- CreateIndex
CREATE INDEX "DealActivity_dealId_idx" ON "DealActivity"("dealId");

-- CreateIndex
CREATE INDEX "DealActivity_userId_idx" ON "DealActivity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignParticipant_campaignId_leadId_key" ON "CampaignParticipant"("campaignId", "leadId");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignMetrics_campaignId_key" ON "CampaignMetrics"("campaignId");

-- CreateIndex
CREATE INDEX "ProjectMilestone_projectId_idx" ON "ProjectMilestone"("projectId");

-- CreateIndex
CREATE INDEX "ProjectTask_projectId_idx" ON "ProjectTask"("projectId");

-- CreateIndex
CREATE INDEX "ProjectTask_assignedToId_idx" ON "ProjectTask"("assignedToId");

-- CreateIndex
CREATE INDEX "ProjectIssue_projectId_idx" ON "ProjectIssue"("projectId");

-- CreateIndex
CREATE INDEX "Document_type_uploadedById_idx" ON "Document"("type", "uploadedById");

-- CreateIndex
CREATE INDEX "SignageSpecification_projectId_idx" ON "SignageSpecification"("projectId");

-- CreateIndex
CREATE INDEX "SignageSpecification_type_idx" ON "SignageSpecification"("type");

-- CreateIndex
CREATE INDEX "SignageSpecification_primaryMaterial_idx" ON "SignageSpecification"("primaryMaterial");

-- CreateIndex
CREATE INDEX "MaterialInventory_materialType_idx" ON "MaterialInventory"("materialType");

-- CreateIndex
CREATE INDEX "MaterialInventory_quantity_idx" ON "MaterialInventory"("quantity");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionSchedule_projectId_key" ON "ProductionSchedule"("projectId");

-- CreateIndex
CREATE INDEX "ProductionSchedule_projectId_idx" ON "ProductionSchedule"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "InstallationSchedule_projectId_key" ON "InstallationSchedule"("projectId");

-- CreateIndex
CREATE INDEX "InstallationSchedule_projectId_idx" ON "InstallationSchedule"("projectId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "Task"("status");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "Task_assignedToId_idx" ON "Task"("assignedToId");

-- CreateIndex
CREATE INDEX "Task_status_dueDate_idx" ON "Task"("status", "dueDate");

-- CreateIndex
CREATE INDEX "Task_assignedToId_status_idx" ON "Task"("assignedToId", "status");

-- CreateIndex
CREATE INDEX "Milestone_status_idx" ON "Milestone"("status");

-- CreateIndex
CREATE INDEX "Milestone_projectId_idx" ON "Milestone"("projectId");

-- CreateIndex
CREATE INDEX "Expense_projectId_idx" ON "Expense"("projectId");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "Expense"("category");

-- CreateIndex
CREATE INDEX "ProjectTeamMember_projectId_idx" ON "ProjectTeamMember"("projectId");

-- CreateIndex
CREATE INDEX "ProjectTeamMember_userId_idx" ON "ProjectTeamMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeamMember_projectId_userId_key" ON "ProjectTeamMember"("projectId", "userId");

-- CreateIndex
CREATE INDEX "ProjectCommunication_projectId_idx" ON "ProjectCommunication"("projectId");

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
CREATE INDEX "ProjectFile_projectId_type_idx" ON "ProjectFile"("projectId", "type");

-- CreateIndex
CREATE INDEX "ProjectFile_category_idx" ON "ProjectFile"("category");

-- CreateIndex
CREATE INDEX "Communication_type_status_createdAt_idx" ON "Communication"("type", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Communication_clientId_idx" ON "Communication"("clientId");

-- CreateIndex
CREATE INDEX "Communication_userId_idx" ON "Communication"("userId");

-- CreateIndex
CREATE INDEX "Communication_type_idx" ON "Communication"("type");

-- CreateIndex
CREATE INDEX "Communication_status_idx" ON "Communication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UserIntegration_userId_key" ON "UserIntegration"("userId");

-- CreateIndex
CREATE INDEX "Customer_status_idx" ON "Customer"("status");

-- CreateIndex
CREATE INDEX "Contact_customerId_idx" ON "Contact"("customerId");

-- CreateIndex
CREATE INDEX "Contact_isPrimary_idx" ON "Contact"("isPrimary");

-- CreateIndex
CREATE INDEX "Review_customerId_idx" ON "Review"("customerId");

-- CreateIndex
CREATE INDEX "Warranty_customerId_idx" ON "Warranty"("customerId");

-- CreateIndex
CREATE INDEX "Warranty_projectId_idx" ON "Warranty"("projectId");

-- CreateIndex
CREATE INDEX "FollowUp_customerId_idx" ON "FollowUp"("customerId");

-- CreateIndex
CREATE INDEX "FollowUp_dueDate_idx" ON "FollowUp"("dueDate");

-- CreateIndex
CREATE INDEX "FollowUp_status_idx" ON "FollowUp"("status");

-- CreateIndex
CREATE INDEX "Proposal_customerId_idx" ON "Proposal"("customerId");

-- CreateIndex
CREATE INDEX "Proposal_contactId_idx" ON "Proposal"("contactId");

-- CreateIndex
CREATE INDEX "Proposal_dealId_idx" ON "Proposal"("dealId");

-- CreateIndex
CREATE INDEX "Activity_userId_idx" ON "Activity"("userId");

-- CreateIndex
CREATE INDEX "Activity_entityId_idx" ON "Activity"("entityId");

-- CreateIndex
CREATE INDEX "Activity_entityType_idx" ON "Activity"("entityType");

-- CreateIndex
CREATE INDEX "Activity_createdAt_idx" ON "Activity"("createdAt");

-- CreateIndex
CREATE INDEX "Activity_importance_idx" ON "Activity"("importance");

-- CreateIndex
CREATE INDEX "Activity_type_idx" ON "Activity"("type");

-- CreateIndex
CREATE INDEX "MarketingCampaign_status_idx" ON "MarketingCampaign"("status");

-- CreateIndex
CREATE INDEX "MarketingCampaign_platform_idx" ON "MarketingCampaign"("platform");

-- CreateIndex
CREATE INDEX "MarketingCampaign_assignedToId_idx" ON "MarketingCampaign"("assignedToId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingMetrics_campaignId_key" ON "MarketingMetrics"("campaignId");

-- CreateIndex
CREATE INDEX "MarketingMetrics_campaignId_idx" ON "MarketingMetrics"("campaignId");

-- CreateIndex
CREATE INDEX "MarketingContent_campaignId_idx" ON "MarketingContent"("campaignId");

-- CreateIndex
CREATE INDEX "MarketingContent_type_idx" ON "MarketingContent"("type");

-- CreateIndex
CREATE INDEX "MarketingContent_status_idx" ON "MarketingContent"("status");

-- CreateIndex
CREATE INDEX "AdSet_campaignId_idx" ON "AdSet"("campaignId");

-- CreateIndex
CREATE INDEX "AdSet_status_idx" ON "AdSet"("status");

-- CreateIndex
CREATE INDEX "Ad_adSetId_idx" ON "Ad"("adSetId");

-- CreateIndex
CREATE INDEX "Ad_status_idx" ON "Ad"("status");

-- CreateIndex
CREATE INDEX "AdMessage_campaignId_idx" ON "AdMessage"("campaignId");

-- CreateIndex
CREATE INDEX "AdMessage_status_idx" ON "AdMessage"("status");

-- CreateIndex
CREATE INDEX "AdMessage_assignedToId_idx" ON "AdMessage"("assignedToId");

-- CreateIndex
CREATE INDEX "AdMessage_platform_idx" ON "AdMessage"("platform");

-- CreateIndex
CREATE INDEX "_DealToDocument_B_index" ON "_DealToDocument"("B");

-- CreateIndex
CREATE INDEX "_DocumentToExpense_B_index" ON "_DocumentToExpense"("B");

-- CreateIndex
CREATE INDEX "_DocumentToProject_B_index" ON "_DocumentToProject"("B");

-- CreateIndex
CREATE INDEX "_DocumentToProjectCommunication_B_index" ON "_DocumentToProjectCommunication"("B");

-- CreateIndex
CREATE INDEX "_MaterialInventoryToSignageSpecification_B_index" ON "_MaterialInventoryToSignageSpecification"("B");

-- CreateIndex
CREATE INDEX "_InstallationScheduleToUser_B_index" ON "_InstallationScheduleToUser"("B");

-- CreateIndex
CREATE INDEX "_TaskDependencies_B_index" ON "_TaskDependencies"("B");

-- CreateIndex
CREATE INDEX "_ProjectCommunicationToUser_B_index" ON "_ProjectCommunicationToUser"("B");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_convertedToId_fkey" FOREIGN KEY ("convertedToId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNote" ADD CONSTRAINT "ClientNote_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNote" ADD CONSTRAINT "ClientNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealActivity" ADD CONSTRAINT "DealActivity_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealActivity" ADD CONSTRAINT "DealActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionPayment" ADD CONSTRAINT "CommissionPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignParticipant" ADD CONSTRAINT "CampaignParticipant_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignParticipant" ADD CONSTRAINT "CampaignParticipant_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignMetrics" ADD CONSTRAINT "CampaignMetrics_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMilestone" ADD CONSTRAINT "ProjectMilestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectIssue" ADD CONSTRAINT "ProjectIssue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignageSpecification" ADD CONSTRAINT "SignageSpecification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionSchedule" ADD CONSTRAINT "ProductionSchedule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallationSchedule" ADD CONSTRAINT "InstallationSchedule_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTeamMember" ADD CONSTRAINT "ProjectTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCommunication" ADD CONSTRAINT "ProjectCommunication_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignVersion" ADD CONSTRAINT "DesignVersion_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignChecklist" ADD CONSTRAINT "DesignChecklist_designVersionId_fkey" FOREIGN KEY ("designVersionId") REFERENCES "DesignVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityControlCheckpoint" ADD CONSTRAINT "QualityControlCheckpoint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIntegration" ADD CONSTRAINT "UserIntegration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingCampaign" ADD CONSTRAINT "MarketingCampaign_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingMetrics" ADD CONSTRAINT "MarketingMetrics_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingContent" ADD CONSTRAINT "MarketingContent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdSet" ADD CONSTRAINT "AdSet_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_adSetId_fkey" FOREIGN KEY ("adSetId") REFERENCES "AdSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdMessage" ADD CONSTRAINT "AdMessage_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "MarketingCampaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdMessage" ADD CONSTRAINT "AdMessage_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealToDocument" ADD CONSTRAINT "_DealToDocument_A_fkey" FOREIGN KEY ("A") REFERENCES "Deal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DealToDocument" ADD CONSTRAINT "_DealToDocument_B_fkey" FOREIGN KEY ("B") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToExpense" ADD CONSTRAINT "_DocumentToExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToExpense" ADD CONSTRAINT "_DocumentToExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProject" ADD CONSTRAINT "_DocumentToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProject" ADD CONSTRAINT "_DocumentToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProjectCommunication" ADD CONSTRAINT "_DocumentToProjectCommunication_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProjectCommunication" ADD CONSTRAINT "_DocumentToProjectCommunication_B_fkey" FOREIGN KEY ("B") REFERENCES "ProjectCommunication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialInventoryToSignageSpecification" ADD CONSTRAINT "_MaterialInventoryToSignageSpecification_A_fkey" FOREIGN KEY ("A") REFERENCES "MaterialInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialInventoryToSignageSpecification" ADD CONSTRAINT "_MaterialInventoryToSignageSpecification_B_fkey" FOREIGN KEY ("B") REFERENCES "SignageSpecification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstallationScheduleToUser" ADD CONSTRAINT "_InstallationScheduleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "InstallationSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstallationScheduleToUser" ADD CONSTRAINT "_InstallationScheduleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskDependencies" ADD CONSTRAINT "_TaskDependencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskDependencies" ADD CONSTRAINT "_TaskDependencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCommunicationToUser" ADD CONSTRAINT "_ProjectCommunicationToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectCommunication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCommunicationToUser" ADD CONSTRAINT "_ProjectCommunicationToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

