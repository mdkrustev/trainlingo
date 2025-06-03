-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'client');

-- CreateEnum
CREATE TYPE "WorkTypeCategoriesKey" AS ENUM ('preparation', 'foundation', 'rough_construction', 'roofing', 'facade', 'interior_works');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'client',
    "googleId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "category" "WorkTypeCategoriesKey",

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
