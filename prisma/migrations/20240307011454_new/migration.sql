/*
  Warnings:

  - Added the required column `subject` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Forum_forumname_key";

-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "subject" TEXT NOT NULL;
