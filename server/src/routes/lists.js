import express from 'express';
import { body, check } from 'express-validator';

import listsControllers from '../controllers/lists.js';
import authMiddlewares from '../middlewares/auth.js';

const router = express.Router();

router.get('/lists', 
  authMiddlewares.jwtVerify,
  listsControllers.getAllLists);

router.get('/lists/:listId', 
  [
    check('listId').trim(),
    check('listId').exists(),
    check('listId').isLength({min: 6}),
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

router.put('/lists/:listId', 
  [
    check('listId').trim(),
    check('listId').exists(),
    check('listId').isLength({min: 6}),
    check('title').trim(),
    check('title').exists(),
    check('description').trim(),
    check('description').exists(),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.updateList);

router.delete('/lists/:listId', 
  [
    check('listId').trim(),
    check('listId').exists(),
    check('listId').isLength({min: 6}),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.deleteList);

router.post(`/lists/:listId/flashcards`, 
  [ 
    check('listId').trim(),
    check('listId').exists(),
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
  ],
  authMiddlewares.jwtVerify,
  listsControllers.createFlashcard);


export default router;
