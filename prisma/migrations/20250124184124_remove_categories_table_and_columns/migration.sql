/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "Categories";

-- DropEnum
DROP TYPE "CategoryType";
