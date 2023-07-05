import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mongo: {
      url: process.env.MONGODB_URL,
    },
    google: {
      clientID: process.env.GOOGLE_AUTH_CLIENT,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      callbackURL: process.env.DATABASE_PORT,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
});
