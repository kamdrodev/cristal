import List from '../models/List.js';
import { validationResult } from 'express-validator';
import chalk from 'chalk';

const getList = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndUpdate({_id: req.params.listId, userId: req.user.id}, {$inc: {views: 1}});
    
    const list = await List.findOne({_id: req.params.listId, userId: req.user.id});

    return res.status(200).json({message: `List have been fetched`, list: list});
  } catch(e) {
    const customError = new Error('Something went wrong during get list process');
    customError.status = 401;

    return next(customError);
  }
};

const getAllLists = async (req, res, next) => {
  try {

    console.log(req.query.firstLanguage);
    console.log(req.query.secondLanguage);
    let queryOptions = {
      "userId": req.user.id,
      "firstLanguage": req.query.firstLanguage ? req.query.firstLanguage : null,
      "secondLanguage": req.query.secondLanguage ? req.query.secondLanguage : null,
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const lists = await List.find(queryOptions);

    return res.status(200).json({message: `Lists have been fetched`, lists: lists});
  } catch(e) {
    const customError = new Error('Something went wrong during get all lists process');
    customError.status = 401;

    return next(customError);
  }
};

const createList = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const newList = new List({
      title: req.body.title,
      description: req.body.description,
      firstLanguage: req.body.firstLanguage,
      secondLanguage: req.body.secondLanguage,
      userId: req.user.id
    });

    const newListSave = await newList.save();

    return res.status(200).json({message: `List has been created`});
  } catch(e) {
    const customError = new Error('Something went wrong during create list process');
    customError.status = 401;

    return next(customError);
  }
};

const updateList = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndUpdate({_id: req.params.listId, userId: req.user.id}, {$set: {title: req.body.title, description: req.body.description}});
    
    return res.status(200).json({message: `Lists have been updated`});
  } catch(e) {
    const customError = new Error('Something went wrong during update list process');
    customError.status = 401;

    return next(customError);
  }
};

const deleteList = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndDelete({_id: req.params.listId, userId: req.user.id});

    return res.status(200).json({message: `List have been deleted`});
  } catch(e) {
    const customError = new Error('Something went wrong during delete list process');
    customError.status = 401;

    return next(customError);
  }
};

const getFlashcard = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOne(
      {_id: req.params.listId, userId: req.user.id, "flashcards._id": req.params.flashcardId}, 
    );

    return res.status(200).json({message: `Flashcard has been created`});
  } catch(e) {
    const customError = new Error('Something went wrong during get flashcard process');
    customError.status = 401;

    return next(customError);
  }
};

const createFlashcard = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndUpdate(
      {_id: req.params.listId, userId: req.user.id}, 
      {$push: {'flashcards': {'firstLanguage': req.body.firstLanguage, 'secondLanguage': req.body.secondLanguage}}},
    );

    
    return res.status(200).json({message: `Flashcard has been created`});
  } catch(e) {
    const customError = new Error('Something went wrong during create flashcard process');
    customError.status = 401;

    return next(customError);
  }
};

const updateFlashcard = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndUpdate(
      {_id: req.params.listId, userId: req.user.id, "flashcards._id": req.params.flashcardId}, 
      {$set: {'flashcards.$.firstLanguage': req.body.firstLanguage, 'flashcards.$.secondLanguage': req.body.secondLanguage }},
    );

    return res.status(200).json({message: `Flashcard has been updated`});
  } catch(e) {
    const customError = new Error('Something went wrong during update flashcard process');
    customError.status = 401;

    return next(customError);
  }
};

const deleteFlashcard = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    await List.findOneAndUpdate(
      {_id: req.params.listId, userId: req.user.id}, 
      {$pull: {'flashcards': {_id: req.params.flashcardId}}},
    );


    return res.status(200).json({message: `Flashcard has been updated`});
  } catch(e) {
    const customError = new Error('Something went wrong during delete flashcard process');
    customError.status = 401;

    return next(customError);
  }
};

const saveQuizResult = async (req, res, next) => {

  console.log("SAVE  QUIZ RESULT ")
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    console.log(req.params.listId)
    console.log(req.body.accuracy)

    const saveQuizResult = await List.findOneAndUpdate(
      {_id: req.params.listId, userId: req.user.id}, 
      {$push: {'statistics.quizzes': {'accuracy': req.body.accuracy}}},
    );

    return res.status(200).json({message: `Statistics have been updated`});

  } catch(e) {
    const customError = new Error('Something went wrong during update statistics process');
  }
};


const lists = {
  getList,
  getAllLists,
  createList,
  updateList,
  deleteList,
  getFlashcard,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  saveQuizResult,
};

export default lists;
