-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "token" TEXT,
    "adressId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "block" VARCHAR(50) NOT NULL,
    "batch" VARCHAR(50) NOT NULL,
    "complement" VARCHAR(80),
    "districtId" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telephone" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "telephone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" TEXT[],
    "description" VARCHAR(80) NOT NULL,
    "img" TEXT NOT NULL DEFAULT E'defaultPizza.png',
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drink" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL DEFAULT E'defaultDrink.png',
    "description" VARCHAR(80),
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "qtdDrink" INTEGER NOT NULL,
    "qtdPizza" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adm" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "adm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_adressId_key" ON "client"("adressId");

-- CreateIndex
CREATE UNIQUE INDEX "district_name_key" ON "district"("name");

-- CreateIndex
CREATE UNIQUE INDEX "adm_email_key" ON "adm"("email");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telephone" ADD CONSTRAINT "telephone_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza" ADD CONSTRAINT "pizza_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drink" ADD CONSTRAINT "drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
