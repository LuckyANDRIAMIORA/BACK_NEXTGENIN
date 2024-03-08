/*
  Warnings:

  - Added the required column `eventdate` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventdate" TEXT NOT NULL;
