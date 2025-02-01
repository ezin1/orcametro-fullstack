/*
  Warnings:

  - Added the required column `organizationId` to the `Budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sellers" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "organizationId" TEXT NOT NULL;
