import secConfiguration from '../api/sec-api-user/config/configuration';
export default () => ({
  ...secConfiguration(),
  env: process.env.APP_PORT,
});
