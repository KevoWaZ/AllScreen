-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "runtime" INTEGER;

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToProductionCompany" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MovieToProductionCompany_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToProductionCompany_B_index" ON "_MovieToProductionCompany"("B");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
