import express from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

import { User } from '../models/user';


const router = express.Router();

router.post(
  '/api/users/signup', 
  [
    body('email')
      .isEmail()
      .withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: express.Request, res: express.Response) => {

    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      throw new BadRequestError('email already in used');
    }
    const user = User.build({email,password});
    await user.save();
    
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    },process.env.JWT_KEY!);
    req.session = {
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { router as signupRouter };
