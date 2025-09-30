import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findById(id).exec();
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async findByPhone(phoneNumber: string) {
    const client = await this.clientModel.findOne({ phoneNumber }).exec();
  
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const updated = await this.clientModel.findByIdAndUpdate(id, updateClientDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Client not found');
    return updated;
  }

  async remove(id: number): Promise<Client> {
    const deleted = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Client not found');
    return deleted;
  }
}
