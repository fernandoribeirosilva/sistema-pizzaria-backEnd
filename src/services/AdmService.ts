import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type AdmProps = {
   email: string;
   password: string;
   adm: boolean;
}

export const AdmService = {
   create: async ({ email, password, adm }: AdmProps) => {
      return await prisma.adm.create({
         data: {
            email,
            password,
            adm
         },
         select: {
            id: true,
            email: true,
            adm: true
         }
      })
   },

   findByEmail: async (email: string) => {
      return await prisma.adm.findFirst({
         where: { email }
      })
   },

}