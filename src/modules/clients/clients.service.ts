import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientResponseDto, UpdateClientResponseDto } from './dto/response-client.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) { }

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

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ id }).exec(); //findById
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async findByPhone(phoneNumber: string) {
    const client = await this.clientModel.findOne({ phoneNumber }).exec();

    return client;
  }

  async update(userId: string, userDto: UpdateClientDto): Promise<UpdateClientResponseDto> {
    if (userDto === null)
      throw new BadRequestException("Veuillez spécifier les informations à mettre à jour");

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
