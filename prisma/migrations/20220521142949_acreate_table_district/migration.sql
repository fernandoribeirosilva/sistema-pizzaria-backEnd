/*
  Warnings:

  - Added the required column `districtId` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "districtId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "district_name_key" ON "district"("name");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
