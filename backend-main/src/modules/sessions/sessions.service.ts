/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import { CreateSessionsDto } from './dto/create-session.dto';
import { UpdateSessionsDto } from './dto/update-session.dto';
import { ResponseSessionsDto } from './dto/response-sessions.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sessions, SessionsDocument } from './entities/session.entity';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Sessions.name) private sessionsModel: Model<SessionsDocument>,
  ) {}

  async create(createSessionsDto: CreateSessionsDto): Promise<Sessions> {
    const sessions = new this.sessionsModel(createSessionsDto);
    return sessions.save();
  }

  async findAll(): Promise<Sessions[]> {
    return this.sessionsModel.find().exec();
  }

  async findById(id: string): Promise<ResponseSessionsDto> {
    const sessions = await this.sessionsModel.findOne({ _id: id }).exec();
    if (!sessions) throw new NotFoundException('Sessions introuvable');
    return new ResponseSessionsDto(sessions);
  }

  async update(
    id: string,
    updateSessionsDto: UpdateSessionsDto,
  ): Promise<Sessions> {
    const updatedSessions = await this.sessionsModel
      .findByIdAndUpdate(
        id,
        updateSessionsDto,
        { new: true, runValidators: true }, // new : retournes le doc mis à jour
      )
      .exec();
    if (!updatedSessions) {
      throw new NotFoundException(`Session avec id="${id}" non trouvé`);
    }
    return updatedSessions;
  }

  remove(id: string): void {
    const sessionsToDelete = this.sessionsModel.findByIdAndDelete(id).exec();
    if (!sessionsToDelete)
      throw new NotFoundException(`Client avec id=${id} non trouvé`);
  }
}
