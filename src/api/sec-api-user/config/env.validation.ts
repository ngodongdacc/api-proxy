import * as Joi from 'joi';

export const secApiUserSchema = {
  // App
  SEC_API_USER_HOST: Joi.string().required(),
};
