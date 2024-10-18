/*
  Warnings:

  - You are about to drop the column `questionId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundColor` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `buttonColor` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeButtonText` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeDescription` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeFooterText` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeImageUrl` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeTitle` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `label` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepId` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandingId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "questionId",
DROP COLUMN "text",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "stepId" TEXT NOT NULL,
ADD COLUMN     "value" TEXT,
ALTER COLUMN "isCorrect" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "backgroundColor",
DROP COLUMN "buttonColor",
DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "welcomeButtonText",
DROP COLUMN "welcomeDescription",
DROP COLUMN "welcomeFooterText",
DROP COLUMN "welcomeImageUrl",
DROP COLUMN "welcomeTitle",
ADD COLUMN     "brandingId" TEXT NOT NULL,
ADD COLUMN     "themeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "buttonText" TEXT,
    "subtitle" TEXT,
    "quizId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branding" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Branding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_brandingId_fkey" FOREIGN KEY ("brandingId") REFERENCES "Branding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
