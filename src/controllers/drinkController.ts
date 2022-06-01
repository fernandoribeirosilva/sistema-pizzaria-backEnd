import { Request, Response } from 'express';
import { DrinkService } from '../services/DrinkService';
import { CategoryService } from '../services/CategoryService';
import * as ManipulateImage from '../helpers/manipulateImage';

type DataProps = {
   name: string;
   price: string;
   size: string;
   description?: string;
   idCategory: number
}

type updateProps = {
   name: string;
   price: string;
   size: string;
   description?: string;
}

export const create = async (req: Request, res: Response) => {
   const { name, price, description, idCategory }: DataProps = req.body;
   let file = req.file;

   if (!file) return res.status(400).json({ error: 'Formato da foto Inválida.', field: `file` });
   if (!name) return res.status(200).json({ error: 'Campo nome é obrigatório.', field: `name` });
   if (!price) return res.status(200).json({ error: 'Campo preço é obrigatório.', field: `price` });


   try {
      const findId = await CategoryService.findById(+idCategory);

      if (!findId) {
         let removeBars = file.path.replace(/[\\"]/g, ' ');
         let nameFile = removeBars.split(' ');

         await ManipulateImage.deletarImagem('./tmp', nameFile[1]);

         return res.status(404).json({ error: `Esta categoria não existe.` });
      }

      try {
         const img = await ManipulateImage.saveImage(file);

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
         return res.status(200).json({ error: `Não foi possível cadastra este produtos.` });
      }

   } catch (error) {
      return res.status(200).json({ error: `Esta categoria não existe.` });
   }
}

export const findAllDrink = async (req: Request, res: Response) => {
   const drinks = await DrinkService.findAll();

   if (!drinks) return res.status(200).json({ error: 'Não tem produtos cadastrados.' });

   return res.status(200).json({ list: drinks });
}

export const findByIdProduct = async (req: Request, res: Response) => {
   const { id } = req.params;


   const hasProduct = await DrinkService.findById(+id);

   if (!hasProduct) return res.status(200).json({ error: 'Este produto não existe.' });

   return res.status(200).json({ list: hasProduct });
}

export const updateProduct = async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id);
   const { name, price, description }: updateProps = req.body;
   const file = req.file;

   const hasProduct = await DrinkService.findById(id);

   if (!hasProduct) return res.status(200).json({ error: 'Este produto não esta cadastrado.' });
   if (!name) return res.status(200).json({ error: `O campo nome é obrigatório`, field: 'name' });
   if (!price) return res.status(200).json({ error: `O campo preço é obrigatório`, field: 'price' });

   try {
      let newImg;

      if (file) {
         if (hasProduct) await ManipulateImage.deletarImagem('./public/media', hasProduct.img);
         newImg = await ManipulateImage.saveImage(file);
      }

      let updateProduct = await DrinkService.update(
         id,
         {
            name,
            price: parseFloat(price),
            description,
            img: newImg ?? hasProduct?.img
         }
      );

      return res.status(200).json({ list: updateProduct });

   } catch (error) {
      return res.status(400).json({ error: 'Este produto não esta cadastrado.' })
   }
}

export const deleteProduct = async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id);

   try {
      const hasProduct = await DrinkService.findById(id);

      if (!hasProduct) return res.status(200).json({ error: 'Este produto não esta cadastrado.' });

      await DrinkService.delete(hasProduct.id);
      await ManipulateImage.deletarImagem('./public/media', hasProduct.img);

      return res.status(200).json({});
   } catch (error) {
      return res.status(400).json({ error: 'Este produto não esta cadastrado.' })
   }

}