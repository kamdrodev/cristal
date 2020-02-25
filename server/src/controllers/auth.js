import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';

import User from '../models/User.js';

const signUp = async (req, res, next) => {
  try {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const customError = new Error('Validation error');
      customError.status = 400;
      return next(customError);
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    const newUserSave = await newUser.save();

    res.status(200).json({message: 'User has been created'});
  } catch (e) {
    const customError = new Error('Something went wrong during sign-up process');
    customError.status = 401;
    return next(customError);
  }
};

const signIn = async (req, res, next) => {
  try {

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {     
      let errors = [];

      for (let i = 0; i < validationErrors.errors.length; i++) {
        errors.push(validationErrors.errors[i]);
      }

      const customError = new Error('Incorrect Data');
      customError.status = 400;
      customError.errors = errors;
      return next(customError);
    }

    const user = await User.findOne({email: req.body.email});

    if (!user) {

      const customError = new Error('Email or password is incorrect');
      customError.status = 401;

      return next(customError);
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const jwtToken =  await jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        admin: user.isAdmin
      }, process.env.SECRET_KEY, {expiresIn: '2h'});

      return res.status(200).json({message: 'You have been signed in', token: jwtToken});
    } else {

      const customError = new Error('Email or password is incorrect');
      customError.status = 401;

      return next(customError);
    }
  } catch(e) {
    const customError = new Error('Something went wrong during sign-in proces');
    customError.status = 401;

    return next(customError);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    return res.status(200).json({message: 'Token is valid'});
  } catch(e) {
    const customError = new Error('Email or password is incorrect');
    customError.status = 401;

    return next(customError);
  }
}

const auth = {
  signUp,
  signIn,
  verifyToken,
};

export default auth;