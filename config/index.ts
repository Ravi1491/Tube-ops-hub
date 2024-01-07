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

  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    issuer: process.env.JWT_ISSUER || 'tube-ops',
  },

  youtube: {
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    redirectUrl: process.env.YOUTUBE_REDIRECT_URL,
  },
};
