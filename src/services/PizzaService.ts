import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type PizzaDataProps = {
   name: string;
   price: number;
   size: string[];
   description: string;
   img: string;
   categoryId: number;
}

type UpdateProps = {
   name: string;
   price: number;
   size: string;
   description: string;
   img?: string;
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
            // categoryId: data.categoryId
            category: {
               connect: {
                  id: data.categoryId
               }
            }
         }
      })
   },

   findAll: async () => {
      return await prisma.pizza.findMany();
   },

   findById: async (id: number) => {
      return await prisma.pizza.findUnique({
         where: { id },

      })
   },

   update: async (id: number, data: UpdateProps) => {
      return await prisma.pizza.update({
         where: { id },
         data: {
            name: data.name,
            price: data.price,
            size: data.size,
            description: data.description,
            img: data.img
         }
      })
   },

   delete: async (id: number) => {
      return await prisma.pizza.delete({ where: { id } });
   },
}