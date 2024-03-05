/*
  Warnings:

  - You are about to drop the column `clubid` on the `Interest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_clubid_fkey";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "clubid";

-- CreateTable
CREATE TABLE "clubinterest" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "clubinterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clubinterest_clubId_interestId_key" ON "clubinterest"("clubId", "interestId");

-- AddForeignKey
ALTER TABLE "clubinterest" ADD CONSTRAINT "clubinterest_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clubinterest" ADD CONSTRAINT "clubinterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
