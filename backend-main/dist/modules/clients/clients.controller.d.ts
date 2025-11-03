import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<import("./entities/client.entity").Client>;
    findAll(): Promise<import("./entities/client.entity").Client[]>;
    findByPhone(phone: CreateAuthPhoneDto): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./entities/client.entity").Client, {}, {}> & import("./entities/client.entity").Client & Required<{
        _id: string;
    }> & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("./entities/client.entity").Client, {}, {}> & import("./entities/client.entity").Client & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
    findOne(req: any): Promise<import("./dto/response-client.dto").ClientResponseDto>;
    remove(id: string): Promise<import("./entities/client.entity").Client>;
}
