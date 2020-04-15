import express from 'express'
import { check } from 'express-validator'

import flashcardControllers from '../controllers/flashcards.js'
import authMiddlewares from '../middlewares/auth.js'

const router = express.Router()

router.get(
  '/flashcards/:listId',
  [
    // check('listId').trim(),
    // check('listId').exists(),
  ],
  authMiddlewares.jwtVerify,
  flashcardControllers.getAllFlashcards
)

router.post(
  '/flashcards',
  [
    check('id').trim(),
    check('id').exists(),
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists(),
    check('listId').trim(),
    check('listId').exists()
  ],
  authMiddlewares.jwtVerify,
  flashcardControllers.createFlashcard
)

router.put(
  '/flashcards/:id',
  [
    check('firstLanguage').trim(),
    check('firstLanguage').exists(),
    check('secondLanguage').trim(),
    check('secondLanguage').exists()
  ],
  authMiddlewares.jwtVerify,
  flashcardControllers.updateFlashcard
)

router.delete(
  '/flashcards/:id',
  [check('id').trim(), check('id').exists()],
  authMiddlewares.jwtVerify,
  flashcardControllers.deleteFlashcard
)

export default router
