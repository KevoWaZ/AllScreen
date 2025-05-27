/*
  Warnings:

  - The primary key for the `List` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_MovieToList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_TVShowToList` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_MovieToList" DROP CONSTRAINT "_MovieToList_A_fkey";

-- DropForeignKey
ALTER TABLE "_TVShowToList" DROP CONSTRAINT "_TVShowToList_A_fkey";

-- AlterTable
ALTER TABLE "List" DROP CONSTRAINT "List_pkey",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "List_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "List_id_seq";

-- AlterTable
ALTER TABLE "_MovieToList" DROP CONSTRAINT "_MovieToList_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_MovieToList_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_TVShowToList" DROP CONSTRAINT "_TVShowToList_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_TVShowToList_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "_MovieToList" ADD CONSTRAINT "_MovieToList_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TVShowToList" ADD CONSTRAINT "_TVShowToList_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
