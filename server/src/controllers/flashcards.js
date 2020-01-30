import List from '../models/List.js';
import Flashcard from '../models/Flashcard.js';
import { validationResult } from 'express-validator';


const getAllFlashcards = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const flashcards = await Flashcard.find({listId: req.params.listId, userId: req.user.id});

    return res.status(200).json({message: `Flashcards have been fetched`, flashcards: flashcards});
  } catch(e) {
    const customError = new Error('Something went wrong during get flashcards process');
    customError.status = 401;

    return next(customError);
  }
}

const createFlashcard = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const list = await List.findOne({_id: req.body.listId, userId: req.user.id});

    const flashcard = new Flashcard({
      firstLanguage: {
        language: list.firstLanguage,
        text: req.body.firstLanguage,
      },
      secondLanguage: {
        language: list.secondLanguage,
        text: req.body.secondLanguage,
      },
      listId: list._id,
      userId: req.user.id,
    });

    const newFlashcardSave = await flashcard.save();

    return res.status(200).json({message: `Flashcard have been created`});
  } catch(e) {
    const customError = new Error('Something went wrong during create flashcards process');
    customError.status = 401;

    return next(customError);
  }
};

const updateFlashcard = async (req, res, next) => {
  try {

    console.log("updateFlashcard");
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    
  
    const flashcard = await Flashcard.findOneAndUpdate({_id: req.params.id, userId: req.user.id}, { $set: {'firstLanguage.text': req.body.firstLanguage, 'secondLanguage.text': req.body.secondLanguage}});
    
    return res.status(200).json({
      message: "Flashcard has been updated"
    });
  } catch(e) {

    console.log("EEE", e);
    const customError = "Something went wrong during get wrong during update flashcards process";
    customError.status = 400;
    next(customError);
  }
}

const deleteFlashcard = async (req, res, next) => {
  try {
    
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }
  
    const flashcard = await Flashcard.findOneAndDelete({_id: req.params.id, userId: req.user.id});;
    
    return res.status(200).json({
      message: "Flashcard has been deleted"
    });
  } catch(e) {
    const customError = "Something went wrong during get wrong during update flashcards process";
    customError.status = 400;
    next(customError);
  }
}

const flashcards = {
  getAllFlashcards,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
};

export default flashcards;