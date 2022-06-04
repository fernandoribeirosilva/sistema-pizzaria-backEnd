import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { ClientProps, Address } from '../types/ClientProps';

export const CLientService = {
   create: async (data: ClientProps) => {
      return await prisma.client.create({
         data: {
            firstName: data.firstName,
            lastName: data.lastName,
            adress: {
               connectOrCreate: {
                  where: { id: data.addressId },
                  create: {
                     street: data.street,
                     block: data.block,
                     batch: data.batch,
                     complement: data.complement,
                     district: {
                        connectOrCreate: {
                           where: { name: data.nameDistrict },
                           create: {
                              name: data.nameDistrict
                           }
                        }
                     }
                  }
               }
            },
         },
         include: {
            adress: {
               include: {
                  district: true
               }
            }
         }
      })
   },

   findBayAddress: async (data: Address) => {
      return await prisma.address.findMany({
         where: {
            AND: [
               {
                  street: data.street,
                  block: data.block,
                  batch: data.batch,
               },
            ]
         },
         select: {
            id: true,
            street: true,
            block: true,
            batch: true,
            complement: true,
            districtId: true,
         }
      });
   },

   findByToken: async (token: string) => {
      return await prisma.client.findFirst({
         where: { token }
      })
   }
}