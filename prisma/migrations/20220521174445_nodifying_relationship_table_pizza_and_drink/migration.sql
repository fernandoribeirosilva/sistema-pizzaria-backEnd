/*
  Warnings:

  - You are about to drop the column `drinkId` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `pizzaId` on the `category` table. All the data in the column will be lost.
  - Added the required column `drinkId` to the `drink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `pizza` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_drinkId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_pizzaId_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "drinkId",
DROP COLUMN "pizzaId";

-- AlterTable
ALTER TABLE "drink" ADD COLUMN     "drinkId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pizza" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drink" ADD CONSTRAINT "drink_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
