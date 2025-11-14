import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramGateway } from './program.gateway';

@Module({
  providers: [ProgramGateway, ProgramService],
})
export class ProgramModule {}
