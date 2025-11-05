import { payload } from '../types/auth';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: payload): {
        id: import("mongoose").Types.ObjectId;
        phone: string;
        activited: boolean;
    };
}
export {};
