import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../../commons/guards/jwt-auth.guard' ///jwt-auth.guard
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }


  // 👈 indique à Swagger qu’il faut un token
  @Get('phone')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findByPhone(@Query('phone') phone: string) {
    return this.clientsService.findByPhone(phone);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientsService.update(+id, updateClientDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}


