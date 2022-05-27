import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export const createNewCategory = async (req: Request, res: Response) => {
   const name: string = req.body.name;

   if (!name) return res.status(200).json({ error: 'É necessário um nome para a Categoria' });

   const category = await CategoryService.createNewCategory(name);

   return res.status(201).json({ category });
}

export const findAllCategory = async (req: Request, res: Response) => {
   const category = await CategoryService.findAll();

   if (!category) return res.status(200).json({ error: 'Não tem categorias cadastrada.' });

   return res.status(200).json({ list: category });
}