import { Request, Response } from 'express';
import { generateToken } from '../config/passport';

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

// export const register = async (req: Request, res: Response) => {
//     if (req.body.name && req.body.password) {
//         let { name, password } = req.body;

//         let hasAdm = await Adm.findOne({ where: { name } });
//         if (!hasAdm) {
//             let newAdm = await Adm.create({ name, password });

//             res.status(201);
//             const token = generateToken({ id: newAdm.id });
//             res.json({ id: newAdm.id, token });
//         } else {
//             res.json({ error: 'E-mail já existe.' });
//         }
//     }

//     res.json({ error: 'E-mail e/ou senha não enviados.' });
// }

// export const login = async (req: Request, res: Response) => {
//     if (req.body.name && req.body.password) {
//         let name: string = req.body.name;
//         let password: string = req.body.password;

//         let adm = await Adm.findOne({
//             where: { name, password }
//         });

//         if (adm) {
//             const token = generateToken({ id: adm.id });
//             res.json({ status: true, token });
//             return;
//         }
//     }

//     res.json({ status: false });
// }

// export const list = async (req: Request, res: Response) => {
//     console.log('USER', req.user)

//     let adm = await Adm.findAll();
//     let list: string[] = [];

//     for (let i in adm) {
//         list.push(adm[i].name);
//     }

//     res.json({ list });
// }

