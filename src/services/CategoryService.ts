import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CategoryService = {
   createNewCategory: async (name: string) => {
      return await prisma.category.create({
         data: { name }
      });
   },

   findAll: async () => {
      return prisma.category.findMany();
   }
}