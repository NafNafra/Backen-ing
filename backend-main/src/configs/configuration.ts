import exp from "constants";
import { mongo } from "mongoose";

export default () => ({
  database: {
    mongo: {
      uri: process.env.MONGO_URI
    }
  }
  ,
  url: {
    base: process.env.BACKEND_BASE_URL,
  },
  sms: {
    token: process.env.SMS_TOKEN,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    phone: {
      secret: process.env.JWT_PHONE_SECRET,
    }
  },
});
