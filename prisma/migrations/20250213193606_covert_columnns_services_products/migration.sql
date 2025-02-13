/*
  Warnings:

  - You are about to drop the `_BudgetsToProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BudgetsToServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BudgetsToProducts" DROP CONSTRAINT "_BudgetsToProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetsToProducts" DROP CONSTRAINT "_BudgetsToProducts_B_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetsToServices" DROP CONSTRAINT "_BudgetsToServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_BudgetsToServices" DROP CONSTRAINT "_BudgetsToServices_B_fkey";

-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "products" JSONB,
ADD COLUMN     "services" JSONB;

-- DropTable
DROP TABLE "_BudgetsToProducts";

-- DropTable
DROP TABLE "_BudgetsToServices";
