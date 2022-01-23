import { Router } from 'express';
import * as authControl from '../controllers/auth.controller';
import { verifySignup } from '../middlewares';

const router = Router();

router.post('/signin', authControl.signIn);
router.post(
    '/signup',
    [
        verifySignup.checkRolesExisted,
        verifySignup.checkDuplicateUsernameOrEmail,
    ],
    authControl.signUp
);

export default router;
