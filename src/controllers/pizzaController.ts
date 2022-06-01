import { Request, Response } from 'express';
import * as ManipulateImage from '../helpers/manipulateImage';
import { CategoryService } from '../services/CategoryService';
import { PizzaService } from '../services/PizzaService';

type DataProps = {
   name: string;
   price: string;
   size: string;
   description: string;
   img: string;
   IdCategory: string;
}

export const newProduct = async (req: Request, res: Response) => {
   let { name, price, size, description, IdCategory }: DataProps = req.body;
   let file = req.file;

   if (!file) return res.status(400).json({ error: 'Formato da foto Inválida.' });
   if (!name) return res.status(400).json({ error: 'O campo nome é obrigatório.', field: 'name' });
   if (!price) return res.status(400).json({ error: 'O campo preço é obrigatório.', field: 'price' });
   if (!size) return res.status(400).json({ error: 'O campo tamanho é obrigatório.', field: 'size' });
   if (!IdCategory) return res.status(400).json({ error: 'O campo categoria é obrigatório.', field: 'IdCategory' });

   try {
      const category = await CategoryService.findById(+IdCategory);

      if (!category) {
         let removeBars = file.path.replace(/[\\"]/g, ' ');
         let nameFile = removeBars.split(' ');

         await ManipulateImage.deletarImagem('./tmp', nameFile[1]);

         return res.status(404).json({ error: `Esta categoria não existe.` });
      }

      const img = await ManipulateImage.saveImage(file);

      let product = await PizzaService.createNewProduct({
         name,
         price: parseFloat(price),
         size: (size ?? 'M').trim().toUpperCase(),
         description,
         img,
         categoryId: category.id
      });

      return res.status(201).json({ list: product });

   } catch (error) {
      return res.status(404).json({ error: 'Error au cadastrada o produto.' });
   }

}

export const listAllProduct = async (req: Request, res: Response) => {
   let data = await PizzaService.findAll();

   if (!data) return res.status(200).json({ error: 'Não tem pizzas cadastrada.' });

   return res.status(200).json({ list: data });
}

export const findByIdProduct = async (req: Request, res: Response) => {
   const { id } = req.params;

   const hasProduct = await PizzaService.findById(parseInt(id));

   if (!hasProduct) return res.status(200).json({ error: 'Este produto não existe.' });

   return res.status(200).json({ list: hasProduct });
}

export const updateProduct = async (req: Request, res: Response) => {
   const id: number = parseInt(req.params.id);
   const { name, price, size, description }: DataProps = req.body;
   let file = req.file;

   if (!name) return res.status(200).json({ error: `O campo nome é obrigatório`, field: 'name' });
   if (!price) return res.status(200).json({ error: `O campo preço é obrigatório`, field: 'price' });
   if (!size) return res.status(200).json({ error: `O campo tamanho é obrigatório`, field: 'size' });
   if (!description) return res.status(200).json({ error: `O campo descrição é obrigatório`, field: 'description' });


   try {
      const hasImage = await PizzaService.findById(id);
      let newImg;

      if (file) {
         if (hasImage) await ManipulateImage.deletarImagem('./public/media', hasImage.img);
         newImg = await ManipulateImage.saveImage(file);
      }


      let updateProduct = await PizzaService.update(
         id,
         {
            name,
            price: parseFloat(price),
            size: size.trim().toUpperCase(),
            description,
            img: newImg ?? hasImage?.img
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
      const hasProduct = await PizzaService.findById(id);

      if (!hasProduct) return res.status(200).json({ error: 'Este produto não esta cadastrado.' });

      await PizzaService.delete(hasProduct.id);
      await ManipulateImage.deletarImagem('./public/media', hasProduct.img);

      return res.status(200).json({});

   } catch (error) {
      return res.status(400).json({ error: 'Este produto não esta cadastrado.' })
   }
}