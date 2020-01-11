import List from '../models/List.js';
import Word from '../models/Word.js';
import { validationResult } from 'express-validator';
import chalk from 'chalk';

const getList = async (req, res, next) => {
  try {
    console.log(chalk.yellow('getList'));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const id = req.params.id;

    console.log(chalk.blue(`
      _id: ${id},
      userId: ${req.user.id},
    `));


    const listViews = await List.findOneAndUpdate({_id: id, userId: req.user.id}, {$inc: {views: 1}});
    const list = await List.findOne({_id: id, userId: req.user.id});
    const words = await Word.find({listId: id, userId: req.user.id});

    console.log(chalk.green(`List have been fetched`));

    return res.status(200).json({message: `List have been fetched`, list: list, words: words});
  } catch(e) {
    console.log(chalk.red(e));
    const customError = new Error('Something went wrong during get list process');
    customError.status = 401;

    return next(customError);
  }
};

const getAllLists = async (req, res, next) => {
  try {
    console.log(chalk.yellow('getAllLists'));

    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    console.log(chalk.blue(`
      Query:

      secondLanguage: ${req.query.secondLanguage} ${req.params.secondLanguage}
    `));

    let queryOptions = {
      "secondLanguage": req.query.secondLanguage ? req.query.secondLanguage : null,
    }

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }


    console.log(queryOptions)
    const lists = await List.find(queryOptions);

    console.log(chalk.green(`Lists have been fetched`));

    return res.status(200).json({message: `Lists have been fetched`, lists: lists});
  } catch(e) {
    console.log(chalk.red(e));
    const customError = new Error('Something went wrong during get all lists process');
    customError.status = 401;

    return next(customError);
  }
};

const createList = async (req, res, next) => {
  try {
    console.log(chalk.yellow('createList'));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {

      console.log(validationErrors)

      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    console.log(chalk.blue(`
      title: ${req.body.title},
      description: ${req.body.description},
      firstLanguage: ${req.body.firstLanguage},
      secondLanguage: ${req.body.secondLanguage},
      userId: ${req.user.id},
    `));

    const newList = new List({
      title: req.body.title,
      description: req.body.description,
      firstLanguage: req.body.firstLanguage,
      secondLanguage: req.body.secondLanguage,
      userId: req.user.id
    });

    const newListSave = await newList.save();

    console.log(chalk.green(`List has been created`));

    return res.status(200).json({message: `List ${req.body.title} has been created`});
  } catch(e) {
    console.log(chalk.red(e));
    const customError = new Error('Something went wrong during create list process');
    customError.status = 401;

    return next(customError);
  }
};

const updateList = async (req, res, next) => {
  try {
    console.log(chalk.yellow('updateList'));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const id = req.params.id;

    console.log(chalk.blue(`
      id: ${req.params.id},
      userId: ${req.user.id},
      title: ${req.body.title},
      description: ${req.body.description},
      firstLanguage: ${req.body.firstLanguage},
      secondLanguage: ${req.body.secondLanguage},
    `));

    const listUpdate = await List.findOneAndUpdate({_id: id, userId: req.user.id}, {$set: {title: req.body.title, description: req.body.description}});

    const lists = await List.find({userId: req.user.id});
    
    console.log(chalk.green(`Lists have been fetched`));

    return res.status(200).json({message: `Lists have been fetched`, lists: lists});
  } catch(e) {
    console.log(chalk.red(e));
    const customError = new Error('Something went wrong during update list process');
    customError.status = 401;

    return next(customError);
  }
};

const deleteList = async (req, res, next) => {
  try {
    console.log(chalk.yellow('deleteList'));

    console.log(req.params)

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Incorrect Data');
      customError.status = 400;
      
      return next(customError);
    }

    const id = req.params.id;


    console.log(chalk.blue(`
      id: ${req.params.id},
      userId: ${req.user.id},
    `));

    const listDelete = await List.findOneAndDelete({_id: id, userId: req.user.id});

    console.log(chalk.green(`List have been deleted`));

    return res.status(200).json({message: `List have been deleted`});
  } catch(e) {
    console.log(chalk.red(e));

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
