import Joi from 'joi';

const username = Joi.string().min(2).max(50).messages({
  'string.base': 'The username must be a string',
  'string.min': 'The username must be larger than or equal to 3',
  'string.max': 'The username must be less than or equal to 50'
});

const password = Joi.string().min(2).max(50).messages({
  'string.base': 'The password must be a string',
  'string.min': 'The password must be larger than or equal to 5',
  'string.max': 'The password must be less than or equal to 50'
});  
  
export const userCreateScheme = Joi.object({
  username: username.required(),
  password: password.required(),
});
