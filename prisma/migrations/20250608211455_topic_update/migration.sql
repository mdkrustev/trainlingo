/*
  Warnings:

  - You are about to drop the column `youtubeUrl` on the `Topic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "youtubeUrl",
ADD COLUMN     "youtubeVideoId" TEXT;
