import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import JWT from 'jsonwebtoken';
import { Adm } from '../models/Adm'

dotenv.config();

const notAuthorizedJson = { status: 401, message: 'Não autorizado' };

const options = {
   // onde vai procurar o token
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_SECRET as string
}

// Aqui eu configuro a Strategy
passport.use(new JWTStrategy(options, async (payload, done) => {
   const adm = await Adm.findByPk(payload.id);
   if (adm) {
      return done(null, adm);
   } else {
      return done(notAuthorizedJson, false);
   }
}));

export const generateToken = (data: object) => {
   return JWT.sign(data, process.env.JWT_SECRET as string);
}

// vai usar o passport para fazer a verificação se der certo ele manda para rota
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
   passport.authenticate('jwt', (err, adm) => {
      req.user = adm;
      return adm ? next() : next(notAuthorizedJson);
   })(req, res, next);
}

export default passport;  