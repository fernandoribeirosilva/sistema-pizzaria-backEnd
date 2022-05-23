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
      return await prisma.pizza.create({
         data: {
            name: data.name,
            price: data.price,
            size: data.size,
            description: data.description,
            img: data.img,
            categoryId: data.categoryId
         }
      })
   },

   findAll: async () => {
      return await prisma.pizza.findMany();
   },

   findById: async (id: number) => {
      return await prisma.pizza.findUnique({
         where: { id }
      })
   }
}