import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { Types } from 'mongoose';
import { ResponseRegisterDto } from './dto/response-register.dto';

@Injectable()
export class RegisterService {
  constructor(private readonly fsUser: FsCustomerService) { }

  async create(
    dto: CreateRegisterDto
  ): Promise<ResponseRegisterDto> {
    const _id = new Types.ObjectId().toString();
    const payload = {
      _id,
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const data = await this.fsUser.saveCustomer(payload);
    return new ResponseRegisterDto(data);
  }

}
