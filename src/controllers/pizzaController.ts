import { Request, Response } from 'express';
import { SaveImage } from '../helpers/saveImage';
import { CategoryService } from '../services/CategoryService';
import { PizzaService } from '../services/PizzaService';

type DataProps = {
   name: string;
   price: string;
   size: string;
   description: string;
   img: string;
   nameCategory: string;
}

export const newProduct = async (req: Request, res: Response) => {
   let { name, price, size, description, nameCategory }: DataProps = req.body;
   let file = req.file;

   if (!file) return res.status(400).json({ error: 'Formato da foto Inválida.' });

   if (name && price && size && description && nameCategory) {

      const hascategory = await CategoryService.findByName(nameCategory);

      if (!hascategory) return res.status(200).json({ error: `Esta cadegoria não existe.` });

      const img = await SaveImage(file);

      let product = await PizzaService.createNewProduct({
         name,
         price: parseFloat(price),
         size: (size ?? 'M').trim(),
         description,
         img,
         categoryId: hascategory.id
      });

      return res.status(201).json({ list: product });

   } else {
      return res.status(400).json({ error: "Campos Obrigatorios." });
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
