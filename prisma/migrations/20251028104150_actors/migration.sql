-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "movieId" INTEGER;

-- CreateTable
CREATE TABLE "_MovieActors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieActors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieActors_B_index" ON "_MovieActors"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieActors" ADD CONSTRAINT "_MovieActors_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieActors" ADD CONSTRAINT "_MovieActors_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
