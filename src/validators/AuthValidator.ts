import { checkSchema } from 'express-validator';

const AuthValidator = {
   signin: checkSchema({
      email: {
         isEmail: true,// tem que ser um e-mail
         normalizeEmail: true, // vai deixar o email todo minusculo e sem espaços
         errorMessage: 'E-mail inválido'
      },
      password: {
         isLength: {
            options: { min: 2 },// a senha tem que ter no mínimo 2 caracteres
         },
         errorMessage: 'Senha precisa ter no mínimo 2 caracteres'
      }
   }),
   signup: checkSchema({
      email: {
         isEmail: true,// tem que ser um e-mail
         normalizeEmail: true, // vai deixar o email todo minusculo e sem espaços
         errorMessage: 'E-mail inválido'
      },
      password: {
         isLength: {
            options: { min: 2 },// a senha tem que ter no mínimo 2 caracteres
         },
         errorMessage: 'Senha precisa ter no mínimo 2 caracteres'
      }
   }),
};

export default AuthValidator;