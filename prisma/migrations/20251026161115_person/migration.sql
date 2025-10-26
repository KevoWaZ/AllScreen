-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profile_path" TEXT NOT NULL,
    "job" TEXT[],

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
