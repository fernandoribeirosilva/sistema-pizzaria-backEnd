import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DrinkProps = {
   name: string;
   price: number;
   img: string;
   description?: string;
   categoryId: number;
}

export const DrinkService = {
   create: async (data: DrinkProps) => {
      return await prisma.drink.create({
         data: {
            name: data.name,
            price: data.price,
            description: data.description ?? '',
            img: data.img,
            categoryId: data.categoryId
         }
      });
   },

   findByDrink: async (id: number) => {
      return await prisma.drink.findMany({
         where: { id }
      })
   },

   findAll: async () => {
      return await prisma.drink.findMany();
   }
}