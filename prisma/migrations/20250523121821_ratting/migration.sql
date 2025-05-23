/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Review_id_seq";
