import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto, UpdateUserResponseDto } from './dto/response-user.dto';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly httpService: HttpService) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    if (!user) throw new NotFoundException("L'utilisateur spécifié est introuvable");
    return new UserResponseDto(user);
  }

  async findByPhone(phoneNumber: CreateAuthPhoneDto) {
    const user = await this.userModel.findOne({ phoneNumber }).exec();
    try {
      const body = { phone: phoneNumber }
      const response = await this.httpService.axiosRef.get(
        `${process.env.BACKEND_FS_URL}/customer/getByAttributes?phone=0342603642`
      )
      console.log(response.data)
      // We could get their phone number, send the message, then show a list on account to view
      // The user cannot change their data 
      // They can view their profile, their certificate, 
      // But what if some usurpator sign up their friend to a formation without their known
      // [{"id":"39","sex":"M","firstname":"Costant","lastname":"RAZAFIMAHATRATRA","adress":"Amontana","email":"constantr@gmail.com","birthdate":"1997-04-24T00:00:00.000Z","birthplace":"Anosivelo","phone":"0342603642","facebook":null,"photo":null,"inactive":false,"createdAt":"2020-09-09T12:43:25.000Z","updatedAt":"2025-10-24T12:16:42.000Z"}]
    } catch (error) {
      console.error('Erreur API externe:', error.response?.data || error.message);
    }

    return user;
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    if (userDto === null) throw new BadRequestException("Veuillez spécifier les informations à mettre à jour");

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      userDto,
      { new: true }
    ).exec();

    if (!updatedUser)
      throw new NotFoundException("L'utilisateur à mettre à jour est introuvable.");

    return new UpdateUserResponseDto(
      new UserResponseDto(updatedUser),
      "Informations mises à jour avec succès",
      200
    );
  }

  async remove(id: number): Promise<User> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
