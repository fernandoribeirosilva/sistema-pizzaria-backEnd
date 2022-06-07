import { Request, Response } from 'express';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { AdmService } from '../services/AdmService';
import bcrypt from 'bcrypt';

import { validationResult, matchedData } from 'express-validator';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);// manda a requisição para AuthValidator

    // ver ser tem algum erro
    if (!errors.isEmpty()) return res.status(404).json({ error: errors.mapped() });

    const data = matchedData(req);// pega os dados que foram validados

    // Verificando se e-mail já existe
    const adm = await AdmService.findByEmail(data.email);
    if (adm) {
        return res.status(404).json({
            error: { email: { msg: 'E-mail já cadastrado!' } }
        });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    // const payload = (Date.now() + (Math.random() * 9999)).toString();
    // const tokenHas = await bcrypt.hash(payload, 10);

    const newAdm = await AdmService.create({
        email: data.email,
        password: passwordHash,
        adm: (data.adm === 1) ? true : false
    });

    const token = JWT.sign(
        { id: newAdm.id },// aqui armazena o que eu possa identificar o usuário
        process.env.JWT_SECRET as string,
        {
            subject: String(newAdm.id),
            expiresIn: '1d'
        }
    );


    return res.status(201).json({ status: true, token });
}

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);// manda a requisição para AuthValidator

    // ver ser tem algum erro
    if (!errors.isEmpty()) return res.status(404).json({ error: errors.mapped() });

    const data = matchedData(req);

    // Validando o email
    const adm = await AdmService.findByEmail(data.email);
    if (!adm) {
        return res.status(404).json({ error: 'E-mail e/ou senha errados!' });
    }

    // Validando a senha
    const match = await bcrypt.compare(data.password, adm.password);
    if (!match) {
        return res.status(404).json({ error: 'E-mail e/ou senha errados!' });
    }

    const token = JWT.sign(
        { id: adm.id },// aqui armazena o que eu possa identificar o usuário
        process.env.JWT_SECRET as string,
        {
            subject: String(adm.adm),
            expiresIn: '1d'
        }
    );

    res.json({ status: true, token })
}

// export const list = async (req: Request, res: Response) => {
//     console.log('USER', req.user)

//     let adm = await Adm.findAll();
//     let list: string[] = [];

//     for (let i in adm) {
//         list.push(adm[i].name);
//     }

//     res.json({ list });
// }

