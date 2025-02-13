-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "discount" DECIMAL(10,2);

-- CreateTable
CREATE TABLE "_BudgetsToProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BudgetsToServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetsToProducts_AB_unique" ON "_BudgetsToProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetsToProducts_B_index" ON "_BudgetsToProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BudgetsToServices_AB_unique" ON "_BudgetsToServices"("A", "B");

-- CreateIndex
CREATE INDEX "_BudgetsToServices_B_index" ON "_BudgetsToServices"("B");

-- AddForeignKey
ALTER TABLE "_BudgetsToProducts" ADD CONSTRAINT "_BudgetsToProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetsToProducts" ADD CONSTRAINT "_BudgetsToProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetsToServices" ADD CONSTRAINT "_BudgetsToServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BudgetsToServices" ADD CONSTRAINT "_BudgetsToServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
