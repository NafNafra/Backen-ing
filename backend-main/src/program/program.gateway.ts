import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@WebSocketGateway()
export class ProgramGateway {
  constructor(private readonly programService: ProgramService) {}

  @SubscribeMessage('createProgram')
  create(@MessageBody() createProgramDto: CreateProgramDto) {
    return this.programService.create(createProgramDto);
  }

  @SubscribeMessage('findAllProgram')
  findAll() {
    return this.programService.findAll();
  }

  @SubscribeMessage('findOneProgram')
  findOne(@MessageBody() id: number) {
    return this.programService.findOne(id);
  }

  @SubscribeMessage('updateProgram')
  update(@MessageBody() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(updateProgramDto.id, updateProgramDto);
  }

  @SubscribeMessage('removeProgram')
  remove(@MessageBody() id: number) {
    return this.programService.remove(id);
  }
}
