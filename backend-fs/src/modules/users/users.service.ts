import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseDto, UpdateUserResponseDto } from './dto/response-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  //async createUser(createUserDto: CreateUserDto): Promise<User> {
  // const user = new this.userModel(createUserDto);
  // return user.save();
  // }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    if (!user) throw new NotFoundException("L'utilisateur spécifié est introuvable");
    return new UserResponseDto(user);
  }

  async findByPhone(phoneNumber: string) {
    const user = await this.userModel.findOne({ phoneNumber }).exec();
    try {
      const body = { phone: phoneNumber }
      const response = await this.httpService.axiosRef.get(
        `${process.env.BACKEND_FS_URL}/customer/getByAttributes?phone=0342603642`
      )
      // console.log(response.data)
    } catch (error) {
      console.error('Erreur API externe:', error.response?.data || error.message);
    }

    return user;
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    if (userDto === null || userId === null) throw new BadRequestException("Veuillez spécifier les informations à mettre à jour");

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      userDto,
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException("L'utilisateur à mettre à jour est introuvable.");
    }
    console.log("Updated user with ID:", updatedUser);

    return new UpdateUserResponseDto(
      new UserResponseDto(updatedUser),
      "Informations mises à jour avec succès",
      200
    );
  }

  async remove(id: string): Promise<User> {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }
}
