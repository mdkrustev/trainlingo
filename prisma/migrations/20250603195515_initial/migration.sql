-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('NATIVE_TO_DE', 'NATIVE_TO_EN', 'EN_TO_NATIVE', 'DE_TO_NATIVE', 'MIXED');

-- CreateEnum
CREATE TYPE "QuizType" AS ENUM ('DEFAULT', 'FLASHCARD', 'TIMED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "name" TEXT,
    "categoryKey" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dictionary" (
    "id" TEXT NOT NULL,
    "wordEn" TEXT,
    "wordDe" TEXT,
    "wordNative" TEXT,
    "contextEn" TEXT,
    "contextDe" TEXT,
    "contextNativ" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dictionary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DictionaryToTopic" (
    "topicId" TEXT NOT NULL,
    "dictionaryId" TEXT NOT NULL,

    CONSTRAINT "DictionaryToTopic_pkey" PRIMARY KEY ("topicId","dictionaryId")
);

-- CreateTable
CREATE TABLE "DictionaryQuiz" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "quizType" "QuizType" NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "totalCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DictionaryQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DictionaryQuizEntry" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "dictionaryId" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "answerGiven" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "timeTakenSec" INTEGER NOT NULL,
    "askedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DictionaryQuizEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryToTopic_topicId_key" ON "DictionaryToTopic"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "DictionaryToTopic_dictionaryId_key" ON "DictionaryToTopic"("dictionaryId");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_id_fkey" FOREIGN KEY ("id") REFERENCES "DictionaryToTopic"("topicId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dictionary" ADD CONSTRAINT "Dictionary_id_fkey" FOREIGN KEY ("id") REFERENCES "DictionaryToTopic"("dictionaryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryQuiz" ADD CONSTRAINT "DictionaryQuiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryQuizEntry" ADD CONSTRAINT "DictionaryQuizEntry_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "DictionaryQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DictionaryQuizEntry" ADD CONSTRAINT "DictionaryQuizEntry_dictionaryId_fkey" FOREIGN KEY ("dictionaryId") REFERENCES "Dictionary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
