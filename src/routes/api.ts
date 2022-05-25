import { Router } from 'express';
import { privateRoute } from '../config/passport';
import multer from 'multer';
import * as ApiController from '../controllers/apiController';
import * as PizzaController from '../controllers/pizzaController';
import * as CategoryController from '../controllers/categoryController';
import * as DrinKController from '../controllers/drinkController';

const upload = multer({
   dest: './tmp',
   fileFilter: (req, file, cb) => {
      const allowed: string[] = ['image/jpeg', 'image/jpeg', 'image/png'];
      cb(null, allowed.includes(file.mimetype));// retorna true ou false
   },
   limits: { fieldSize: 2000000 }// so aceitar arquivos com 2 Btys
});

const router = Router();

router.get('/ping', ApiController.ping);

router.get('/findAllCategorys', CategoryController.findAllCategory);
router.get('/pizza', PizzaController.listAllProduct);
router.get('/pizza/:id', PizzaController.findByIdProduct);
router.get('/bebida', DrinKController.findAllDrink);
router.get('/bebida/:id', DrinKController.findByIdProduct);

// router.post('/register', ClienteController.register);
// router.post('/login', ApiController.login);

router.post('/cadastra-pizza', upload.single('img'), PizzaController.newProduct);
router.post('/cadastra-bebida', upload.single('img'), DrinKController.create);
router.post('/newCategory', CategoryController.creaNewCategory);
router.put('/atualizar-produto/:id', upload.single('img'), PizzaController.updateProduct);



// router.get('/listProduct/:id', PizzaController.findByProduct);

export default router;