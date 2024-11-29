/*
  Warnings:

  - Added the required column `isCompany` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isCompany" BOOLEAN NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL;
