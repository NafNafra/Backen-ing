import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatResponseDto } from '@/modules/certificats/dto/response-certificat.dto';
import { CertDto } from '@/commons/providers/fsback/dto/cert.dto';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';

@ApiTags('Certificats')
@Controller('certificats')
export class CertificatsController {
  constructor(private readonly certificatsService: CertificatsService) { }


  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiOkResponse({
    description: 'Certificates retrieved successfully',
    type: [CertDto]
  })
  findAll(): Promise<CertDto[]> {
    return this.certificatsService.findAll();
  }

  @Get('cert')
  @ApiOperation({ summary: 'Get certificate by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Certificate found',
    type: CertificatResponseDto
  })
  @ApiNotFoundResponse({ description: 'Certificate not found' })
  findOne(
    @Req() req: Request & { user: { _id: string } }
  ): Promise<CertificatResponseDto> {
    const userId = req.user._id;
    return this.certificatsService.findById(userId);
  }

}
