import express from 'express';
import { check } from 'express-validator';

import wordsControllers from '../controllers/words.js';
import authMiddlewares from '../middlewares/auth.js';

const router = express.Router();

router.get('/words/:listId', 
  [
    // check('listId').trim(),
    // check('listId').exists(),
  ],
  authMiddlewares.jwtVerify,
  wordsControllers.getWords);

router.post('/words', 
  [
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
    check('listId').trim(),
    check('listId').exists(),
  ],
  authMiddlewares.jwtVerify,
  wordsControllers.createWords);

router.put('/words/:id', 
  [
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
  ],
  authMiddlewares.jwtVerify,
  wordsControllers.updateWords);

router.delete('/words/:id', 
  [
    check('id').trim(),
    check('id').exists(),
    check('id').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  wordsControllers.deleteWords);

export default router;