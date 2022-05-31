import { Request, Response } from 'express';
import { CLientService } from '../services/ClientService';
import * as ClientProps from '../types/ClientProps';

export const createAddress = async (req: Request, res: Response) => {
   let {
      firstName,
      lastName,
      street,
      block,
      batch,
      complement,
      nameDistrict
   }: ClientProps.ClientProps = req.body;

   let id;

   if (!firstName) return res.status(200).json({ error: 'O campo nome é obrigatório.' });
   if (!lastName) return res.status(200).json({ error: 'O campo sobrenome é obrigatório.' });
   if (!nameDistrict) return res.status(200).json({ error: 'O campo bairro é obrigatório.' });

   const hasAddresss = await CLientService.findBayAddress({
      street,
      block,
      batch,
   });

   if (hasAddresss) {
      hasAddresss.find(data => id = data.id);
   }

   try {
      const newUser = await CLientService.create({
         firstName,
         lastName,
         addressId: id ?? 0,
         street,
         block,
         batch,
         complement,
         nameDistrict
      });

      return res.status(200).json({ list: { newUser } });

   } catch (error) {
      return res.status(200).json({ error: 'Error au cadastrada o endereço ou o usuário já tem este endereço cadastrado.' });
   }
}