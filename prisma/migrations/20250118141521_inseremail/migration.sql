/*
  Warnings:

  - Added the required column `email` to the `Sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sellers" ADD COLUMN     "email" TEXT NOT NULL;
