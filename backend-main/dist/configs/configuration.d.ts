declare const _default: () => {
    database: {
        mongo: {
            uri: string | undefined;
        };
    };
    url: {
        base: string | undefined;
    };
    sms: {
        token: string | undefined;
    };
    jwt: {
        secret: string | undefined;
        expiresIn: string | undefined;
        refresh: {
            secret: string | undefined;
            expiresIn: string | undefined;
        };
        phone: {
            secret: string | undefined;
        };
    };
    fs_url: {
        base: string | undefined;
        token: string | undefined;
    };
};
export default _default;
