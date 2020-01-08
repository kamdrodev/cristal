import List from '../models/List.js';
import Word from '../models/Word.js';
import { validationResult } from 'express-validator';

const getList = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const id = req.params.id;

    const listViews = await List.findOneAndUpdate({_id: id, userId: req.user.id}, {$inc: {views: 1}});
    const list = await List.findOne({_id: id, userId: req.user.id});
    const words = await Word.find({listId: id, userId: req.user.id});

    return res.status(200).json({message: `List have been fetched`, list: list, words: words});
  } catch(e) {
    const customError = new Error('Something went wrong during get list process');
    customError.status = 401;

    return next(customError);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const lists = await List.find();

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

      console.log(validationErrors)

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

    return res.status(200).json({message: `List ${req.body.title} has been created`});
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

    const id = req.params.id;
    const title = req.body.title;

    const listUpdate = await List.findOneAndUpdate({_id: id, userId: req.user.id}, {$set: {title: req.body.title}});

    const lists = await List.find({userId: req.user.id});
    
    return res.status(200).json({message: `Lists have been fetched`, lists: lists});
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

    const id = req.params.id;

    const listDelete = await List.findOneAndDelete({_id: id, userId: req.user.id});

    const lists = await List.find({userId: req.user.id});

    return res.status(200).json({message: `List have been deleted`, lists: lists});
  } catch(e) {
    const customError = new Error('Something went wrong during delete list process');
    customError.status = 401;

    return next(customError);
  }
};

const lists = {
  getList,
  getAllLists,
  createList,
  updateList,
  deleteList,
};

export default lists;
