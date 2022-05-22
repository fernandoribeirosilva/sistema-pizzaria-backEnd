/*
  Warnings:

  - You are about to drop the column `drinkId` on the `drink` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `drink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "drink" DROP CONSTRAINT "drink_drinkId_fkey";

-- AlterTable
ALTER TABLE "drink" DROP COLUMN "drinkId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "drink" ADD CONSTRAINT "drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
