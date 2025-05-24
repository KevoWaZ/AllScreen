/*
  Warnings:

  - The values [SERIES] on the enum `ReviewType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReviewType_new" AS ENUM ('MOVIE', 'TVSHOW');
ALTER TABLE "Review" ALTER COLUMN "type" TYPE "ReviewType_new" USING ("type"::text::"ReviewType_new");
ALTER TYPE "ReviewType" RENAME TO "ReviewType_old";
ALTER TYPE "ReviewType_new" RENAME TO "ReviewType";
DROP TYPE "ReviewType_old";
COMMIT;
