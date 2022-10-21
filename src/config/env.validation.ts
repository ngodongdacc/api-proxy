import * as Joi from 'joi';
import { secApiUserSchema } from 'src/api/sec-api-user/config/env.validation';

export const validationSchema = Joi.object({
  // App
  ...secApiUserSchema,
  APP_PORT: Joi.number().default(4001),
});
