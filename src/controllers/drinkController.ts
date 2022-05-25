import { Request, Response } from 'express';
import { DrinkService } from '../services/DrinnkService';
import { CategoryService } from '../services/CategoryService';
import * as ManipulateImage from '../helpers/manipulateImage';

type DataProps = {
   name: string;
   price: string;
   size: string;
   description?: string;
   idCategory: number
}

export const create = async (req: Request, res: Response) => {
   const { name, price, description, idCategory }: DataProps = req.body;
   let file = req.file;

   if (!file) return res.status(400).json({ error: 'Formato da foto Inválida.', field: `file` });
   if (!name) return res.status(200).json({ error: 'Campo nome é obrigátorio.', field: `name` });
   if (!price) return res.status(200).json({ error: 'Campo preço é obrigátorio.', field: `price` });

   const img = await ManipulateImage.saveImage(file);

   try {
      const findId = await CategoryService.findById(+idCategory);

      if (!findId) return res.status(200).json({ error: `Esta cadegoria não existe.` });

      try {
         const newDrink = await DrinkService.create(
            {
               name,
               price: parseFloat(price),
               description,
               img,
               categoryId: findId.id
            }
         );

         return res.status(201).json({ data: newDrink });
      } catch (error) {
         return res.status(200).json({ error: `Não foi possivel cadastra este produtos.` });
      }

   } catch (error) {
      return res.status(200).json({ error: `Esta cadegoria não existe.` });
   }
}

export const findAllDrink = async (req: Request, res: Response) => {
   const drinks = await DrinkService.findAll();

   if (!drinks) return res.status(200).json({ error: 'Não tem produtos cadastrados.' });

   return res.status(200).json({ list: drinks });
}