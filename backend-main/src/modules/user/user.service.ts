/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserResponseDto,
  UpdateUserResponseDto,
} from './dto/response-user.dto';
import { ConfigsService } from 'src/configs';
import { CreateAuthPhoneDto } from '../auth/dto/create-auth.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: Types.ObjectId): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    if (!user)
      throw new NotFoundException("L'utilisateur spécifié est introuvable");
    return new UserResponseDto(user);
  }

  async findByPhone(phoneNumber: CreateAuthPhoneDto) {
    const user = await this.userModel.find({ phoneNumber }).exec();
    try {
      const response = await this.httpService.axiosRef.get(
        `${this.configsService.get('fs_url.base')}/customer/getByAttributes?phone=12`,
        {
          headers: {
            Authorization: `Bearer ${this.configsService.get('fs_url.token')}`,
          },
        },
      );
      console.log("Found it ?   ", response);
      console.log(user ? "Users : " + user : 'No user found with that phone number');
    } catch (error) {
      console.error(
        'Erreur API externe:',
        error.response?.data || error.message,
      );
    }

    return user;
  }

  async update(
    userId: string,
    userDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    if (userDto === null || userId === null)
      throw new BadRequestException(
        'Veuillez spécifier les informations à mettre à jour',
      );

    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, userDto, { new: true })
      .exec();

    const userk = await this.userModel.findOne({ _id: userId }).exec();
    if (!updatedUser) {
      throw new NotFoundException(
        "L'utilisateur à mettre à jour est introuvable.",
      );
    }

    return new UpdateUserResponseDto(
      new UserResponseDto(updatedUser),
      'Informations mises à jour avec succès',
      200,
    );
  }

  async remove(id: number): Promise<User> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
