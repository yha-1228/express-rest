import express from 'express';
import usersController from '../../middlewares/controllers/usersController';

const router: express.Router = express.Router();

router.get('/', usersController.findAll);

export default router;
