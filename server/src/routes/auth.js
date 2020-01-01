import express from 'express';
import { check } from 'express-validator';

import authControllers from '../controllers/auth.js';
import authMiddlewares from '../middlewares/auth.js';

const router = express.Router();

router.post('/sign-up', 
  [
    check('username').trim(),
    check('username').exists(),
    check('username').isLength({min: 6}),
    check('email').trim(),
    check('email').exists(),
    check('email').normalizeEmail().isEmail(),
    check('password').trim(),
    check('password').exists(),
    check('password').isLength({min: 6}),
  ],
  authMiddlewares.checkIfUserExists,
  authControllers.signUp);
router.post('/sign-in', 
    check('email').trim(),
    check('email').exists(),
    check('email').normalizeEmail().isEmail(),
    check('password').trim(),
    check('password').exists(),
    check('password').isLength({min: 6}),
    authControllers.signIn);

export default router;