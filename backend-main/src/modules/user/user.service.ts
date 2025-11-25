import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { ConfigsService } from 'src/configs';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import {
  UserResponseDto,
  UpdateUserResponseDto,
} from '@/modules/user/dto/response-user.dto';
import { User, UserDocument } from '@/modules/user/entities/user.entity';
import { CreateAuthPhoneDto } from '@/modules/auth/dto/create-auth.dto';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { externPayload } from '@/commons/types/auth';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
    private readonly configsService: ConfigsService,
    private readonly fsCustomer: FsCustomerService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(_id: Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: _id }).exec();
    if (!user)
      throw new NotFoundException("L'utilisateur spécifié est introuvable");

    const inFs = await this.fsCustomer.getCustById(user.idUser);
    if (!inFs || inFs.length > 1)
      throw new NotFoundException("L'utilisateur spécifié est introuvable");

    const cleanUserData = {
      ...inFs[0],
      name: inFs[0].firstname + " " + inFs[0].lastname,
      refreshToken: user.refreshToken
    }
    return cleanUserData;
  }

  async findByUserId(_id: Types.ObjectId) {
    const userLocal = await this.findById(_id);

    if (userLocal.length > 1 || !userLocal)
      throw new NotFoundException("L'utilisateur spécifié est introuvable");

    return userLocal;
  }

  async findByPhone(phoneNumber: CreateAuthPhoneDto | string) {
    try {
      const users = await this.userModel.find({ phoneNumber: phoneNumber });
      if (users === null || users.length === 0) throw new BadRequestException('Aucun etudiant avec ce numero')
      return users;
    } catch (error) {
      console.error(
        'Erreur API externe:',
        error.response?.data || error.message,
      );
    }
  }

  async update(
    userId: Types.ObjectId,
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

  async findAndSyncExternalUsers(phoneNumber: CreateAuthPhoneDto): Promise<UserResponseDto[]> {

    const externalUsers = await this.fsCustomer.getCustsByPhone(phoneNumber);
    if (!externalUsers || externalUsers.length === 0) {
      throw new BadRequestException(`Aucun étudiant trouvé avec le numéro ${phoneNumber}`);
    }

    const savedUsers: UserResponseDto[] = [];

    for (const ext of externalUsers) {
      const payload: externPayload = {
        idUser: ext._id,
        name: `${ext.firstname} ${ext.lastname}`,
        phoneNumber: ext.phone,
        compteFb: ext.facebook !== 'null' ? ext.facebook : undefined,
        activated: false,
      };

      let localUser = await this.userModel.findOne({ idUser: ext._id });

      if (!localUser) {
        localUser = new this.userModel(payload);
        await localUser.save();
      } else {
        Object.assign(localUser, payload);
        await localUser.save();
      }

      const dto = new UserResponseDto(localUser);
      savedUsers.push(dto);
    }
    return savedUsers;
  }

  async updateOtp(idUser: string, code: string, expiresAt: string) {
    await this.userModel.updateOne(
      { idUser: idUser },
      { _OtpCode: code, _OtpExpiresAt: expiresAt },
    );
  }

}
