/*
  Warnings:

  - The primary key for the `List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TVId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `List` table. All the data in the column will be lost.
  - The `id` column on the `List` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_TVId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_movieId_fkey";

-- AlterTable
ALTER TABLE "List" DROP CONSTRAINT "List_pkey",
DROP COLUMN "TVId",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "movieId",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_MovieToList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TVShowToList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TVShowToList_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToList_B_index" ON "_MovieToList"("B");

-- CreateIndex
CREATE INDEX "_TVShowToList_B_index" ON "_TVShowToList"("B");

-- AddForeignKey
ALTER TABLE "_MovieToList" ADD CONSTRAINT "_MovieToList_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToList" ADD CONSTRAINT "_MovieToList_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TVShowToList" ADD CONSTRAINT "_TVShowToList_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TVShowToList" ADD CONSTRAINT "_TVShowToList_B_fkey" FOREIGN KEY ("B") REFERENCES "TVShow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
