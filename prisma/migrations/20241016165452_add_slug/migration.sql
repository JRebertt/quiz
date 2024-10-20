/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "color" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_slug_key" ON "Quiz"("slug");
