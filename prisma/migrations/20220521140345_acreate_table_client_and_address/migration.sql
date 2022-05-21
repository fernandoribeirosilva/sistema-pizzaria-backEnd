-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "adressId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "block" VARCHAR(50) NOT NULL,
    "batch" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(80) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_adressId_key" ON "client"("adressId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
