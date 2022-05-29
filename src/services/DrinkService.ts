import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type DrinkProps = {
   name: string;
   price: number;
   img: string;
   description?: string;
   categoryId: number;
}

type UpdateProps = {
   name: string;
   price: number;
   description?: string;
   img?: string;
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

   findById: async (id: number) => {
      return await prisma.drink.findUnique({
         where: { id }
      })
   },

   findAll: async () => {
      return await prisma.drink.findMany();
   },

   update: async (id: number, data: UpdateProps) => {
      return await prisma.drink.update({
         where: { id },
         data: {
            name: data.name,
            price: data.price,
            description: data.description,
            img: data.img
         }
      })
   },

   delete: async (id: number) => {
      return await prisma.drink.delete({ where: { id } });
   },
}