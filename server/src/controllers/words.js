import List from '../models/List.js';
import Word from '../models/Word.js';
import { validationResult } from 'express-validator';


const getWords = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const words = await Word.findOne({_id: req.params.id, userId: req.user.id});

    return res.status(200).json({message: `Words have been fetched`, words: words});
  } catch(e) {
    const customError = new Error('Something went wrong during get words process');
    customError.status = 401;

    return next(customError);
  }
}

const createWords = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const list = await List.findOne({_id: req.body.listId, userId: req.user.id});
    
    const word = new Word({
      firstLanguage: req.body.firstLanguage,
      secondLanguage: req.body.secondLanguage,
      listId: list._id,
      userId: req.user.id,
    });

    const newWordSave = await word.save();

    return res.status(200).json({message: `Words have been created`});
  } catch(e) {
    const customError = new Error('Something went wrong during create words process');
    customError.status = 401;

    return next(customError);
  }
};

const updateWords = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }
  
    const word = await Word.findOneAndUpdate({_id: req.params.id, userId: req.user.id}, { $set: {firstLanguage: req.body.firstLanguage, secondLanguage: req.body.secondLanguage}});
    
    return res.status(200).json({
      message: "Word has been updated"
    });
  } catch(e) {
    const customError = "Something went wrong during get wrong during update words process";
    customError.status = 400;
    next(customError);
  }
}

const deleteWords = async (req, res, next) => {
  try {
    
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }
  
    const word = await Word.findOneAndDelete({_id: req.params.id, userId: req.user.id});;
    
    return res.status(200).json({
      message: "Word has been deleted"
    });
  } catch(e) {
    const customError = "Something went wrong during get wrong during update words process";
    customError.status = 400;
    next(customError);
  }
}

const words = {
  getWords,
  createWords,
  updateWords,
  deleteWords,
};

export default words;