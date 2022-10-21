import * as Joi from 'joi';

export const secApiUserSchema = {
  // App
  SEC_API_ORGAN_HOST: Joi.string().required(),
};
