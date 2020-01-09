import express from 'express';
import { body, check } from 'express-validator';

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
  body("firstLanguage").custom(value => {
    const listOfLanguages = [
      "spanish",
      "french",
      "german",
      "polish",
      "russian",
      "english",
      "japanese",
    ];
    if (!listOfLanguages.includes(value)) {
      throw new Error("You can't select this language");
    }

    return true;

  }),
  body("secondLanguage").custom(value => {
    const listOfLanguages = [
      "spanish",
      "french",
      "german",
      "polish",
      "russian",
      "english",
      "japanese",
    ];

    if (!listOfLanguages.includes(value)) {
      throw new Error("You can't select this language");
    }

    return true;
  }),
  [
    check('title').trim(),
    check('title').exists(),
    check('description').trim(),
    check('description').exists(),
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.createList);

router.put('/lists/:id', 
  [
    check('id').trim(),
    check('id').exists(),
    check('id').isLength({min: 6}),
    check('title').trim(),
    check('title').exists(),
    check('description').trim(),
    check('description').exists(),
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