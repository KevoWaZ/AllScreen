/*
  Warnings:

  - You are about to drop the column `releaseYear` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `TVShow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "releaseYear",
ADD COLUMN     "release_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TVShow" DROP COLUMN "startYear",
ADD COLUMN     "first_air_date" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");
