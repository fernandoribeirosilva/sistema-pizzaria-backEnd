import { Router } from 'express';
import { privateRoute } from '../config/passport';
import multer from 'multer';
import * as ApiController from '../controllers/apiController';
import * as PizzaController from '../controllers/pizzaController';
import * as CategoryController from '../controllers/categoryController';

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

router.get('/findAllCategorys', CategoryController.findCategory);
router.get('/produtos', PizzaController.listAllProduct);
router.get('/produto/:id', PizzaController.findByIdProduct);

// router.post('/register', ClienteController.register);
// router.post('/login', ApiController.login);


// router.get('/list', privateRoute, ApiController.list);

router.post('/create', upload.single('img'), PizzaController.newProduct);
router.post('/newCategory', CategoryController.creaNewCategory);



// router.get('/listProduct/:id', PizzaController.findByProduct);

export default router;