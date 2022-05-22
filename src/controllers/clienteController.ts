// import { Request, Response } from 'express';

// const verificaCampo = (data: string[] = []) => {

//    let info: string[] = ['nome', 'rua', 'numero', 'bairro'];

//    for (let index in data) {
//       if (!data[index]) {
//          for (let i in info) {
//             if (index === i) {
//                return info[i];
//             }
//          }
//       }
//    }
// }

// export const register = async (req: Request, res: Response) => {
//    let { nome, rua, numero, complemento, bairro } = req.body;

//    if (nome && rua && numero && bairro) {
//       let newCliente = await Cliente.create({
//          nome,
//          rua,
//          numero,
//          complemento,
//          bairro
//       });

//       res.status(201).json({ data: newCliente });
//    } else {
//       let data: string[] = [];

//       data.push(nome, rua, numero, bairro);

//       let result = verificaCampo(data);

//       res.status(400).json({ error: `Campo ${result} obrigatorio` });
//    }

// }