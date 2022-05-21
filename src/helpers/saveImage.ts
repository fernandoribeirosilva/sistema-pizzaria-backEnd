import sharp from 'sharp';
import { unlink } from 'fs/promises';

export const SaveImage = async (file: Express.Multer.File) => {
   let fileName = '';

   if (file) {
      fileName = `${file.filename}.jpg`;

      await sharp(file.path)
         .resize(200)// redimesionar a imagem
         .toFormat('jpeg')
         .toFile(`./public/media/${fileName}`);// salvando o arquivo 

      await unlink(file.path);// deleta o arquivo da pasta tenporaria tmp
   }

}