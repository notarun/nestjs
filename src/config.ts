export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    debug: process.env.APP_DEBUG === 'true',
  },
  database: {
    type: process.env.DB_TYPE || 'mysql',
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3307,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});
