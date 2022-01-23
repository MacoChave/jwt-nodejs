import { Router } from 'express';
import * as userControl from '../controllers/user.controller';
import { authJWT, verifySignup } from '../middlewares';

const router = Router();

router.post(
    '/',
    [
        authJWT.verifyToken,
        authJWT.isAdmin,
        verifySignup.checkRolesExisted,
        verifySignup.checkDuplicateUsernameOrEmail,
    ],
    userControl.createUser
);

export default router;
