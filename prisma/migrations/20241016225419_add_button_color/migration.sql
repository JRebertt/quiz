/*
  Warnings:

  - You are about to drop the column `color` on the `Quiz` table. All the data in the column will be lost.
  - Made the column `welcomeButtonText` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "color",
ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "buttonColor" TEXT NOT NULL DEFAULT '#3b82f6',
ALTER COLUMN "welcomeButtonText" SET NOT NULL;
