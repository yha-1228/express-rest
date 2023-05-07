import express from 'express';
import preCheckToken from '../../middlewares/common/preCheckToken';
import usersController from '../../middlewares/controllers/usersController';
import usersValidator from '../../middlewares/validators/usersValidator';

const router: express.Router = express.Router();

router.get('/', preCheckToken, usersController.findAll);

router.post('/', preCheckToken, usersValidator.create, usersController.create);

router.post('/login', usersController.login);

router.get('/token', preCheckToken, usersController.refreshToken);

export default router;
