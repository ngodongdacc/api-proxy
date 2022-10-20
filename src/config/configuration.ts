export default () => ({
  // app port
  env: process.env.APP_PORT,
  AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
  AWS_COGNITO_USERPOOL_ID: process.env.AWS_COGNITO_USERPOOL_ID,
});
