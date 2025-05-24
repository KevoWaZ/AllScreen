/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_seriesId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "seriesId",
ADD COLUMN     "TVId" INTEGER;

-- DropTable
DROP TABLE "Series";

-- CreateTable
CREATE TABLE "TVShow" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,

    CONSTRAINT "TVShow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_TVId_fkey" FOREIGN KEY ("TVId") REFERENCES "TVShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;
