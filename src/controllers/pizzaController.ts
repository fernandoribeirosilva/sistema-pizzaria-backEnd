import { Request, Response } from 'express';
import { SaveImage } from '../helpers/saveImage';
import { CategoryService } from '../services/CategoryService';
import { PizzaService } from '../services/pizzaService';

type DataProps = {
   name: string;
   price: number;
   size: string;
   description: string;
   img: string;
   idCategory: string;
}

export const newProduct = async (req: Request, res: Response) => {
   let { name, price, size, description, idCategory }: DataProps = req.body;
   let file = req.file;

   if (!file) return res.status(400).json({ error: 'Formato da foto Inválida.' });

   if (name && price && size && description) {

      const img = await SaveImage(file);

      const categoryId = await CategoryService.createNewCategory(idCategory);

      let product = await PizzaService.createNewProduct({
         name,
         price,
         size,
         description,
         img,
         categoryId: categoryId.id
      })

      // return res.status(200).json({ list: product });
   } else {
      return res.status(400).json({ error: "Campos Obrigatorios." });
   }
}

export const listAllProduct = async (req: Request, res: Response) => {
   let data = await PizzaService.findAll();

   if (data) return res.status(200).json({ error: 'Não tem pizzas cadastrada.' });

   return res.status(200).json({ list: data });
}

// export const findByProduct = async (req: Request, res: Response) => {
//    const { id } = req.params;

//    try {
//       const product = await Pizza.findByPk(id);

//       if (!product) {
//          throw new Error('Este produto não existe.');
//       }

//       res.status(200).json({ data: product });
//    } catch (err) {
//       res.json({ error: "Este produto não existe." });
//    }

