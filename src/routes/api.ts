import { Router, Request, Response } from 'express';
import multer from 'multer';
import * as AuthController from '../controllers/authController';
import * as PizzaController from '../controllers/pizzaController';
import * as CategoryController from '../controllers/categoryController';
import * as DrinKController from '../controllers/drinkController';
import * as CheckoutController from '../controllers/checkoutController';
import * as ClienteController from '../controllers/clienteController';

import { Auth } from '../middlewares/Auth';
import AuthValidator from '../validators/AuthValidator';

const upload = multer({
   dest: './tmp',
   fileFilter: (req, file, cb) => {
      const allowed: string[] = ['image/jpeg', 'image/jpeg', 'image/png'];
      cb(null, allowed.includes(file.mimetype));// retorna true ou false
   },
   limits: { fieldSize: 2000000 }// so aceitar arquivos com 2 Bytes
});

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
   res.json({ pong: true });
});

router.get('/categorias', CategoryController.findAllCategory);
router.get('/pizzas', PizzaController.listAllProduct);
router.get('/pizza/:id', PizzaController.findByIdProduct);
router.get('/bebidas', DrinKController.findAllDrink);
router.get('/bebida/:id', DrinKController.findByIdProduct);

router.post('/adm/signin', AuthValidator.signin, AuthController.login);
router.post('/adm/signup', AuthValidator.signup, AuthController.register);

router.post('/cadastra-pizza', Auth.private, upload.single('img'), PizzaController.newProduct);
router.post('/cadastra-bebida', Auth.private, upload.single('img'), DrinKController.create);
router.post('/cadastra-categoria', Auth.private, CategoryController.createNewCategory);

router.post('/checkout', CheckoutController.done);
router.post('/registrar-endereco', ClienteController.createAddress);

router.put('/pizza/:id/atualizar', Auth.private, upload.single('img'), PizzaController.updateProduct);
router.put('/bebida/:id/atualizar', Auth.private, upload.single('img'), DrinKController.updateProduct);

router.delete('/pizza/:id/deletar', Auth.private, PizzaController.deleteProduct);
router.delete('/bebida/:id/deletar', Auth.private, DrinKController.deleteProduct);

// router.get('/listProduct/:id', PizzaController.findByProduct);

export default router;