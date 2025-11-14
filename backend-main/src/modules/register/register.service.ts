import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';
import { Types } from 'mongoose';

@Injectable()
export class RegisterService {
  constructor(private readonly fsUser: FsCustomerService) { }

  create(createRegisterDto: CreateRegisterDto) {
    const _id = new Types.ObjectId().toString(); 

    const payload = {
      _id,
      ...createRegisterDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return this.fsUser.saveCustomer(payload);
  }

}
