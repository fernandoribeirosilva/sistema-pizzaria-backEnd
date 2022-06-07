/*
  Warnings:

  - You are about to drop the column `token` on the `adm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adm" DROP COLUMN "token",
ADD COLUMN     "adm" BOOLEAN NOT NULL DEFAULT false;
