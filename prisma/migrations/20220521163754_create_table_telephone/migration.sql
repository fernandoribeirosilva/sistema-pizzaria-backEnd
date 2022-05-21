-- CreateTable
CREATE TABLE "telephone" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "telephone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "telephone" ADD CONSTRAINT "telephone_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
