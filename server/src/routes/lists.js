import express from 'express';
import { check } from 'express-validator';

import listsControllers from '../controllers/lists.js';
import authMiddlewares from '../middlewares/auth.js';

const router = express.Router();

router.get('/lists', 
  authMiddlewares.jwtVerify,
  listsControllers.getAllLists);

router.get('/lists/:id', 
  [
    check('id').trim(),
    check('id').exists(),
    check('id').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.getList);

router.post('/lists', 
  [
    check('title').trim(),
    check('title').exists(),
    check('title').isLength({min: 6}),
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('firstLanguage').isLength({min: 6}),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
    check('secondLanguage').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.createList);

router.put('/lists/:id', 
  [
    check('id').trim(),
    check('id').exists(),
    check('id').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.updateList);

router.delete('/lists/:id', 
  [
    check('id').trim(),
    check('id').exists(),
    check('id').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.deleteList);

export default router;