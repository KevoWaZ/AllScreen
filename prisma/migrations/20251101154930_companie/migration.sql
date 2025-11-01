/*
  Warnings:

  - Added the required column `logo_path` to the `ProductionCountry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductionCountry" ADD COLUMN "logo_path" TEXT NOT NULL DEFAULT '';
