import { Request, Response } from 'express';
import sharp from 'sharp';
import { unlink } from 'fs/promises';
import { Pizza } from '../models/Pizza';
import { SaveImage } from '../helpers/saveImage';


export const newProduct = async (req: Request, res: Response) => {
   let { sabor, preco, tamanho, descricao } = req.body;
   let file = req.file;
   let fileName = '';

   if (!file) {
      return res.status(400).json({ error: 'Formato da foto Inválida.' });
   }

   if (sabor && preco && tamanho && descricao) {

      SaveImage(file)

      let product = await Pizza.create({
         sabor,
         preco,
         tamanho,
         descricao,
         imagem: fileName
      })

      return res.status(200).json({ list: product });
   } else {
      return res.status(400).json({ error: "Campos Obrigatorios." });
   }
}

export const listAllProduct = async (req: Request, res: Response) => {
   let data = await Pizza.findAll();

   res.status(200).json({ list: data });
}

export const findByProduct = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const product = await Pizza.findByPk(id);

      if (!product) {
         throw new Error('Este produto não existe.');
      }

      res.status(200).json({ data: product });
   } catch (err) {
      res.json({ error: "Este produto não existe." });
   }


}