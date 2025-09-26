import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './dto/user.dto';
import { LogUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>) { }

  async create(createDto: any): Promise<UserDocument> {
    const createdDocument = new this.userModel(createDto);
    return createdDocument.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateDto: any): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<UserDocument | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async logUser(logDto: LogUserDto): Promise<UserDocument | null> {
    const { phone } = logDto;
    console.log(phone);
    const user = await this.userModel.findOne({ phone }).exec();
    console.log(user)
    if(!user) {
      throw new UnauthorizedException('Invalid phone number');
    }
    return user;
  }
}
