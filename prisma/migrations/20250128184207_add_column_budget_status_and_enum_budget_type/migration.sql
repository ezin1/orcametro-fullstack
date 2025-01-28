/*
  Warnings:

  - Added the required column `budgetStatus` to the `Budgets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `budgetType` on the `Budgets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('SERVICE', 'PRODUCT', 'HYBRID');

-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "budgetStatus" "BudgetStatus" NOT NULL,
DROP COLUMN "budgetType",
ADD COLUMN     "budgetType" "BudgetType" NOT NULL;
