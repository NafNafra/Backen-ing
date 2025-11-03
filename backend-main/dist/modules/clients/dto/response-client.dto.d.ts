import { Client } from "../entities/client.entity";
export declare class ClientResponseDto {
    constructor(user: Client);
    id?: string;
    idUser?: string;
    name?: string;
    phoneNumber?: string;
    activated?: boolean;
    reactivationDate?: string;
    refreshToken?: string;
    email: string;
}
export declare class UpdateClientResponseDto {
    constructor(data: ClientResponseDto, message: string, statusCode: number);
    data: ClientResponseDto;
    message: string;
    statusCode: number;
}
