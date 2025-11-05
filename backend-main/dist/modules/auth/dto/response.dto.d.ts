import { HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
export type AuthResponse = {
    user: {
        id: Types.ObjectId;
        name: string;
        phoneNumber: string;
        activated: boolean;
    }[];
    message: string;
    statusCode: HttpStatus;
    accessToken?: string;
    refreshToken?: string;
};
