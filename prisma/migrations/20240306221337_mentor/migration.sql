/*
  Warnings:

  - You are about to drop the `Clubmontor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Montor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clubmontor" DROP CONSTRAINT "Clubmontor_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Clubmontor" DROP CONSTRAINT "Clubmontor_montorId_fkey";

-- DropTable
DROP TABLE "Clubmontor";

-- DropTable
DROP TABLE "Montor";

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "namementor" TEXT NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clubmentor" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "mentorId" INTEGER NOT NULL,

    CONSTRAINT "Clubmentor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_namementor_key" ON "Mentor"("namementor");

-- CreateIndex
CREATE UNIQUE INDEX "Clubmentor_clubId_mentorId_key" ON "Clubmentor"("clubId", "mentorId");

-- AddForeignKey
ALTER TABLE "Clubmentor" ADD CONSTRAINT "Clubmentor_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clubmentor" ADD CONSTRAINT "Clubmentor_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
