import sharp from 'sharp';
import { unlink } from 'fs/promises';
import fs from 'fs';

export const saveImage = async (file: Express.Multer.File) => {
   let fileName = '';

   if (file) {
      fileName = `${file.filename}.jpg`;

      await sharp(file.path)
         .resize(200)// redimesionar a imagem
         .toFormat('jpeg')
         .toFile(`./public/media/${fileName}`);// salvando o arquivo 

      await unlink(file.path);// deleta o arquivo da pasta tenporaria tmp
   }
   return fileName;
}

export const deleImagem = async (diretorio: string, nameImagem: string) => {
   let listaImagem = fs.readdirSync(diretorio);// vai ler todos os arquivos do tiretorio que foi passado

   // a função includes verifica se tem a string que foi passada
   if (listaImagem.includes(nameImagem)) {
      fs.unlinkSync(`./public/media/${nameImagem}`);// a função fs.unlinkSync vai deletar o arquivo
   }
}

