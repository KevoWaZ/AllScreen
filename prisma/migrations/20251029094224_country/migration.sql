-- CreateTable
CREATE TABLE "ProductionCountry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToProductionCountry" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieToProductionCountry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieToProductionCountry_B_index" ON "_MovieToProductionCountry"("B");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCountry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
