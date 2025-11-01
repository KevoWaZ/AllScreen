/*
  Warnings:

  - You are about to drop the column `logo_path` on the `ProductionCountry` table. All the data in the column will be lost.
  - Added the required column `logo_path` to the `ProductionCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductionCompany" ADD COLUMN "logo_path" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ProductionCountry" DROP COLUMN "logo_path";
