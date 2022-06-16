/*
  Warnings:

  - The `size` column on the `pizza` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pizza" DROP COLUMN "size",
ADD COLUMN     "size" TEXT[];
