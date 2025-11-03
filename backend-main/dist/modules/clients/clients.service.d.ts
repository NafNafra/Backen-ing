import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';
import { Model } from 'mongoose';
import { ClientResponseDto, UpdateClientResponseDto } from './dto/response-client.dto';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
export declare class ClientsService {
    private clientModel;
    private readonly httpService;
    constructor(clientModel: Model<ClientDocument>, httpService: HttpService);
    createClient(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findById(userId: string): Promise<ClientResponseDto>;
    findByPhone(phoneNumber: CreateAuthPhoneDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: string;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, Client, {}, {}> & Client & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    update(userId: string, userDto: UpdateClientDto): Promise<UpdateClientResponseDto>;
    remove(id: number): Promise<Client>;
}
