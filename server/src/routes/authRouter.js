import { Router } from 'express';
import { CASLogin, CASLogout } from '../controllers/authentication/casAuthController.js';
import { GoogleLogin } from '../controllers/authentication/googleAuthController.js';

const router = Router();

router.post('/google/login', GoogleLogin);

router.get('/cas/login', CASLogin);
router.get('/cas/logout', CASLogout);

export default router;