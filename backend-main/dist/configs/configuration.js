"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        mongo: {
            uri: process.env.MONGO_URI,
        },
    },
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
        },
    },
    fs_url: {
        base: process.env.BACKEND_FS_URL,
        token: process.env.JWT_TOKEN_FS
    },
});
//# sourceMappingURL=configuration.js.map