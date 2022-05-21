-- CreateTable
CREATE TABLE "pizza" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" CHAR(3) NOT NULL DEFAULT E'P, M, G',
    "description" VARCHAR(80) NOT NULL,
    "img" TEXT NOT NULL DEFAULT E'defaultPizza.png',

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drink" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "img" TEXT NOT NULL DEFAULT E'defaultDrink.png',
    "description" VARCHAR(80) NOT NULL,

    CONSTRAINT "drink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
