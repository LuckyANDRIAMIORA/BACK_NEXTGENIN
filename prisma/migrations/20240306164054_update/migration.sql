/*
  Warnings:

  - You are about to drop the `clubinterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clubinterest" DROP CONSTRAINT "clubinterest_clubId_fkey";

-- DropForeignKey
ALTER TABLE "clubinterest" DROP CONSTRAINT "clubinterest_interestId_fkey";

-- DropTable
DROP TABLE "clubinterest";

-- CreateTable
CREATE TABLE "Clubinterest" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "Clubinterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clubinterest_clubId_interestId_key" ON "Clubinterest"("clubId", "interestId");

-- AddForeignKey
ALTER TABLE "Clubinterest" ADD CONSTRAINT "Clubinterest_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clubinterest" ADD CONSTRAINT "Clubinterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
