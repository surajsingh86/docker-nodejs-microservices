import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const userSchema = Joi.object({
  user: Joi.string().required().messages({
    'string.empty': 'User name is required',
    'any.required': 'User name is required'
  }),
  class: Joi.string().required().messages({
    'string.empty': 'Class is required',
    'any.required': 'Class is required'
  }),
  age: Joi.number().integer().positive().required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.positive': 'Age must be positive',
    'any.required': 'Age is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  })
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  req.body = value;
  next();
}; 