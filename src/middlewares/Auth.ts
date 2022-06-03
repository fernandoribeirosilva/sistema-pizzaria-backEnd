import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

import { AdmService } from '../services/AdmService';

dotenv.config();

export const Auth = {
   private: async (req: Request, res: Response, next: NextFunction) => {
      if (!req.query.token && !req.body.token) return res.status(401).json({ notallowed: true });

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

      next();
   }
}
