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

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "drink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
