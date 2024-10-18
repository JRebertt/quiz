/*
  Warnings:

  - Added the required column `welcomeButtonText` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeDescription` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeFooterText` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeImageUrl` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `welcomeTitle` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "welcomeButtonText" TEXT NOT NULL,
ADD COLUMN     "welcomeDescription" TEXT NOT NULL,
ADD COLUMN     "welcomeFooterText" TEXT NOT NULL,
ADD COLUMN     "welcomeImageUrl" TEXT NOT NULL,
ADD COLUMN     "welcomeTitle" TEXT NOT NULL;
