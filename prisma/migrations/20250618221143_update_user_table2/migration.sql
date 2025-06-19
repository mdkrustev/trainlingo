-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "accessTokenExp" INTEGER,
ADD COLUMN     "refreshToken" TEXT;
