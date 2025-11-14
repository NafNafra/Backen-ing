import { Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { FsCustomerService } from '@/commons/providers/fsback/fs-customer.service';

@Injectable()
export class RegisterService {
  constructor(private readonly fsUser: FsCustomerService) { }

  create(createRegisterDto: CreateRegisterDto) {
    return this.fsUser.saveCustomer(createRegisterDto);
  }

}
