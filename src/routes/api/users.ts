import express from 'express';
import usersController from '../../middlewares/controllers/usersController';
import usersValidator from '../../middlewares/validators/usersValidator';

const router: express.Router = express.Router();

router.get('/', usersController.findAll);

router.post('/', usersValidator.create, usersController.create);

router.post('/login', usersController.login);

export default router;
