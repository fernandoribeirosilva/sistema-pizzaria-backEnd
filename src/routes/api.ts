import { Router } from 'express';
import { privateRoute } from '../config/passport';
import multer from 'multer';
import * as ApiController from '../controllers/apiController';
import * as PizzaController from '../controllers/pizzaController';
import * as CategoryController from '../controllers/categoryController';
import * as DrinKController from '../controllers/drinkController';
import * as CheckoutController from '../controllers/checkoutController';

const upload = multer({
   dest: './tmp',
   fileFilter: (req, file, cb) => {
      const allowed: string[] = ['image/jpeg', 'image/jpeg', 'image/png'];
      cb(null, allowed.includes(file.mimetype));// retorna true ou false
   },
   limits: { fieldSize: 2000000 }// so aceitar arquivos com 2 Bytes
});

const router = Router();

router.get('/ping', ApiController.ping);

router.get('/categorias', CategoryController.findAllCategory);
router.get('/pizzas', PizzaController.listAllProduct);
router.get('/pizza/:id', PizzaController.findByIdProduct);
router.get('/bebidas', DrinKController.findAllDrink);
router.get('/bebida/:id', DrinKController.findByIdProduct);

// router.post('/login', ApiController.login);

router.post('/cadastra-pizza', upload.single('img'), PizzaController.newProduct);
router.post('/cadastra-bebida', upload.single('img'), DrinKController.create);
router.post('/cadastra-categoria', CategoryController.createNewCategory);
router.post('/checkout', CheckoutController.done);

router.put('/pizza/:id/atualizar', upload.single('img'), PizzaController.updateProduct);
router.put('/bebida/:id/atualizar', upload.single('img'), DrinKController.updateProduct);

router.delete('/pizza/:id/deletar', PizzaController.deleteProduct);
router.delete('/bebida/:id/deletar', DrinKController.deleteProduct);

// router.get('/listProduct/:id', PizzaController.findByProduct);

export default router;