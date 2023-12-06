import 'dotenv/config';

export const applicationConfig = {
  app: {
    env: process.env.APP_ENV,
    port: process.env.APP_PORT || '4000',
  },

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
