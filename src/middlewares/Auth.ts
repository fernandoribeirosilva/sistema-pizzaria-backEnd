import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

import { AdmService } from '../services/AdmService';
import { log } from 'console';

dotenv.config();


export const Auth = {
   private: async (req: Request, res: Response, next: NextFunction) => {
      /* if (!req.query.token && !req.body.token) return res.status(401).json({ notallowed: true });

      let token = '';
      if (req.query.token) {
         token = req.query.token as string;
      }
      if (req.body.token) {
         token = req.body.token as string;
      }

      if (token === '') {
         return res.status(401).json({ notallowed: true });
      }

      const user = await AdmService.findByToken(token);

      if (!user) return res.status(401).json({ notallowed: true });

      next(); */

      let success = false;


      if (req.headers.authorization) {

         const [authType, token] = req.headers.authorization.split(' ');
         if (authType === 'Bearer') {
            try {
               const { sub } = JWT.verify(token, process.env.JWT_SECRET as string);

               if (sub !== 'true') throw new Error('Invalid token');

               success = true;


            } catch (error) {
               // vai passar direto para a mensagem Não autorizado
               return res.status(403).json({ error: 'Não autorizado.' });
            }
         }
      }

      if (success) {
         next();
      } else {
         return res.status(403).json({ error: 'Seção expirada.' });
      }
   }
}
