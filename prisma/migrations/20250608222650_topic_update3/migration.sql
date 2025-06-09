/*
  Warnings:

  - The primary key for the `DictionaryToTopic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[topicId,dictionaryId]` on the table `DictionaryToTopic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Dictionary" DROP CONSTRAINT "Dictionary_id_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_id_fkey";

-- DropIndex
DROP INDEX "DictionaryToTopic_dictionaryId_key";

-- DropIndex
DROP INDEX "DictionaryToTopic_topicId_key";

-- AlterTable
ALTER TABLE "DictionaryToTopic" DROP CONSTRAINT "DictionaryToTopic_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DictionaryToTopic_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryToTopic_topicId_dictionaryId_key" ON "DictionaryToTopic"("topicId", "dictionaryId");

-- AddForeignKey
ALTER TABLE "DictionaryToTopic" ADD CONSTRAINT "DictionaryToTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryToTopic" ADD CONSTRAINT "DictionaryToTopic_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES "Dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
