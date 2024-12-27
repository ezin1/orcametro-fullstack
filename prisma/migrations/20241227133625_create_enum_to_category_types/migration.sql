/*
  Warnings:

  - Changed the type of `categoryType` on the `Categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('PRODUCT', 'SERVICE');

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "categoryType",
ADD COLUMN     "categoryType" "CategoryType" NOT NULL;
