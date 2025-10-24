-- CreateTable
CREATE TABLE "MovieGenre" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToGenre_B_index" ON "_MovieToGenre"("B");

-- AddForeignKey
ALTER TABLE "_MovieToGenre" ADD CONSTRAINT "_MovieToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToGenre" ADD CONSTRAINT "_MovieToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieGenre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
