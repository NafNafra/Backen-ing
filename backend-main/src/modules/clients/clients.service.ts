import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientResponseDto, UpdateClientResponseDto } from './dto/response-client.dto';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios'

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>, private readonly httpService: HttpService) { }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const client = new this.clientModel(createClientDto);
    return client.save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findById(userId: string): Promise<ClientResponseDto> {
    const user = await this.clientModel.findOne({ _id: userId }).exec();
    if (!user) throw new NotFoundException("L'utilisateur spécifié est introuvable");
    return new ClientResponseDto(user);
  }

  async findByPhone(phoneNumber: CreateAuthPhoneDto) {
    const client = await this.clientModel.findOne({ phoneNumber }).exec();
    try {
      const body = { phone: phoneNumber }
      const response = await this.httpService.axiosRef.get(
        `${process.env.BACKEND_FS_URL}/customer/getByAttributes?phone=0342603642`
      )
      console.log(response.data)
      // We could get their phone number, send the message, then show a list on account to view
      // The client cannot change their data 
      // They can view their profile, their certificate, 
      // But what if some usurpator sign up their friend to a formation without their known
      // [{"id":"39","sex":"M","firstname":"Costant","lastname":"RAZAFIMAHATRATRA","adress":"Amontana","email":"constantr@gmail.com","birthdate":"1997-04-24T00:00:00.000Z","birthplace":"Anosivelo","phone":"0342603642","facebook":null,"photo":null,"inactive":false,"createdAt":"2020-09-09T12:43:25.000Z","updatedAt":"2025-10-24T12:16:42.000Z"}]
    } catch (error) {
      console.error('Erreur API externe:', error.response?.data || error.message);
    }

    return client;
  }

  async update(userId: string, userDto: UpdateClientDto): Promise<UpdateClientResponseDto> {
    if (userDto === null) throw new BadRequestException("Veuillez spécifier les informations à mettre à jour");

    const updatedUser = await this.clientModel.findByIdAndUpdate(
      userId,
      userDto,
      { new: true }
    ).exec();

    if (!updatedUser)
      throw new NotFoundException("L'utilisateur à mettre à jour est introuvable.");

    return new UpdateClientResponseDto(
      new ClientResponseDto(updatedUser),
      "Informations mises à jour avec succès",
      200
    );
  }

  async remove(id: number): Promise<Client> {
    const deleted = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Client not found');
    return deleted;
  }
}
