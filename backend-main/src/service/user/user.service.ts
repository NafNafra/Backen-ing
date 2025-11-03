import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) { }

  async create(createUserDto: CreateUserDto) {
    return lastValueFrom(
      this.usersClient.send('createUser', createUserDto),
    );
  }

  async findAll() {
    return lastValueFrom(
      this.usersClient.send('findAllUsers', {}),
    );
  }

  async findById(id: string) {
    return lastValueFrom(
      this.usersClient.send('findById', id),
    );
  }

  async findByPhone(phone: string) {
    return lastValueFrom(
      this.usersClient.send('findByPhone', phone),
    );
  }

  async update(updateUserDto: UpdateUserDto) {
    return lastValueFrom(
      this.usersClient.send('updateUser', updateUserDto),
    );
  }

  async remove(id: string) {
    return lastValueFrom(
      this.usersClient.send('removeUser', id),
    );
  }
}
