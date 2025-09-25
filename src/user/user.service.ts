import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async register(name: string, email: string, password: string, code: number): Promise<UserDocument> {
    const newUser = new this.userModel({ name, email, password, code });
    return newUser.save();
  }


  startHome(id: number): string {
    if (id >= 18) return 'Home page' + id;
    return "null"
  }

  hello(): string {
    return "Hold up"

  }

}
