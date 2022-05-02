import { Request, Response } from 'express';
import sharp from 'sharp';
import { unlink } from 'fs/promises';
import { Pizza } from '../models/Pizza';


export const newProduct = async (req: Request, res: Response) => {
   let { sabor, preco, tamanho, descricao } = req.body;
   let file = req.file;
   let fileName = '';

   if (file) {
      fileName = `${file.filename}.jpg`;

      await sharp(file.path)
         .resize(200)// redimesionar a imagem
         .toFormat('jpeg')
         .toFile(`./public/media/${fileName}`);// salvando o arquivo 

      await unlink(file.path);// deleta o arquivo da pasta tenporaria tmp

   } else {
      res.status(400).json({ error: 'Arquivo Inválido.' });
      return;
   }

   if (sabor && preco && tamanho && descricao) {

      let product = await Pizza.create({
         sabor,
         preco,
         tamanho,
         descricao,
         imagem: fileName
      })

      res.status(200).json({ list: product });
      return;
   } else {
      res.status(400).json({ error: "Campos Obrigatorios." });
      return;
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