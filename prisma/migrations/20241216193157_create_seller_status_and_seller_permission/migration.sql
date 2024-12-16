/*
  Warnings:

  - Added the required column `sellerPermission` to the `Sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerStatus` to the `Sellers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SellersStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SellerPermission" AS ENUM ('ADMIN', 'SELLER');

-- AlterTable
ALTER TABLE "Sellers" ADD COLUMN     "sellerPermission" "SellerPermission" NOT NULL,
ADD COLUMN     "sellerStatus" "SellersStatus" NOT NULL;
