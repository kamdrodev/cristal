import express from 'express'
import { check } from 'express-validator'

import authControllers from '../controllers/auth.js'
import authMiddlewares from '../middlewares/auth.js'

const router = express.Router()

router.post(
  '/sign-up',
  [
    check('username')
      .exists()
      .withMessage('Fill username field'),
    check('username').isLength({ min: 6, max: 16 }),
    check('email').trim(),
    check('email')
      .exists()
      .withMessage('Fill email field'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email is not valid'),
    check('password')
      .exists()
      .withMessage('Fill email field'),
    check('password')
      .isLength({ min: 6, max: 16 })
      .withMessage('The password must be 6+ chars long')
  ],
  authMiddlewares.checkIfUserExists,
  authControllers.signUp
)

router.post(
  '/sign-in',
  check('email')
    .exists()
    .withMessage('Fill username field'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .exists()
    .withMessage('Fill password field'),
  check('password')
    .isLength({ min: 6, max: 16 })
    .withMessage('The password must be 6+ chars long'),
  authControllers.signIn
)

router.get(
  '/verify-token',
  authMiddlewares.jwtVerify,
  authControllers.verifyToken
)

export default router
