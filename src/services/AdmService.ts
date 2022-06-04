import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type AdmProps = {
   email: string;
   password: string;
   token: string;
}

export const AdmService = {
   create: async ({ email, password, token }: AdmProps) => {
      return await prisma.adm.create({
         data: {
            email,
            password,
            token,
         },
         select: {
            token: true,
            email: true,
            password: true,
         }
      })
   },

   findOne: async (email: string) => {
      return await prisma.adm.findFirst({
         where: { email }
      })
   },

   findByToken: async (token: string) => {
      return await prisma.adm.findFirst({
         where: { token }
      })
   },
}