import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PizzaDataProps = {
   name: string;
   price: number;
   size: string;
   description: string;
   img: string;
   categoryId: number;
}

export const PizzaService = {
   createNewProduct: async (data: PizzaDataProps) => {

   },

   findAll: async () => {
      return await prisma.pizza.findMany();
   }
}