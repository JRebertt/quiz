/*
  Warnings:

  - You are about to drop the column `stepId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `brandingId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `themeId` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `Step` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quizId]` on the table `Branding` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizId]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quizId` to the `Branding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Made the column `isCorrect` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `buttonColor` to the `Theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buttonTextColor` to the `Theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progressBarColor` to the `Theme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quizId` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_stepId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_brandingId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_quizId_fkey";

-- AlterTable
ALTER TABLE "Branding" ADD COLUMN     "quizId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "stepId",
DROP COLUMN "value",
ADD COLUMN     "questionId" TEXT NOT NULL,
ALTER COLUMN "isCorrect" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "brandingId",
DROP COLUMN "themeId";

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "buttonColor" TEXT NOT NULL,
ADD COLUMN     "buttonTextColor" TEXT NOT NULL,
ADD COLUMN     "progressBarColor" TEXT NOT NULL,
ADD COLUMN     "quizId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Step";

-- CreateTable
CREATE TABLE "Welcome" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "buttonText" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Welcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Welcome_quizId_key" ON "Welcome"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_quizId_key" ON "Result"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "Branding_quizId_key" ON "Branding"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_quizId_key" ON "Theme"("quizId");

-- AddForeignKey
ALTER TABLE "Welcome" ADD CONSTRAINT "Welcome_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branding" ADD CONSTRAINT "Branding_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
