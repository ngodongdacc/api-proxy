import * as Joi from 'joi';
import { secApiUserSchema } from 'src/api/sec-api-user/config/env.validation';

export const validationSchema = Joi.object({
  // App
  ...secApiUserSchema,
  APP_PORT: Joi.number().default(4001),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  AWS_COGNITO_CLIENT_ID: Joi.string().required(),
  AWS_COGNITO_REGION: Joi.string().required(),
  AWS_COGNITO_USERPOOL_ID: Joi.string().required(),
  AUTH0_SECRET: Joi.string().required(),
  AUTH0_BASE_URL: Joi.string().required(),
  AUTH0_ISSUER_BASE_URL: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
  AUTH0_AUDIENCE: Joi.string().required(),
  AUTH0_DOMAIN: Joi.string().required(),
  AUTH0_API_CLIENT_ID: Joi.string().required(),
  AUTH0_API_CLIENT_SECRET: Joi.string().required(),
  AUTH0_TOKEN_URL: Joi.string().required(),
  AUTH0_CONNECTION: Joi.string().required(),
  AXONIZE_LOGIN_URL: Joi.string().required(),
  AXONIZE_OFFICE_URL: Joi.string().required(),
  AXONIZE_API_URL: Joi.string().required(),
  AXONIZE_TENANT_ID: Joi.string().required(),
  AXONIZE_CLP_URL: Joi.string().required(),
});
