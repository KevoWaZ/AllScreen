-- CreateTable
CREATE TABLE "MovieKeyword" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToKeyword_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToKeyword_B_index" ON "_MovieToKeyword"("B");

-- AddForeignKey
ALTER TABLE "_MovieToKeyword" ADD CONSTRAINT "_MovieToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToKeyword" ADD CONSTRAINT "_MovieToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
