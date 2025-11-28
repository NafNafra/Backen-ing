import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
import { CertificatsService } from '@/modules/certificats/certificats.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CertificatResponseDto } from '@/modules/certificats/dto/response-certificat.dto';
import { CertDto } from '@/commons/providers/fsback/dto/cert.dto';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { ConfigsService } from '@/configs';

@ApiTags('Certificats')
@Controller('certificats')
export class CertificatsController {
  constructor(
    private readonly certificatsService: CertificatsService,
    private readonly configsService: ConfigsService
  ) { }


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
    @Req() req: Request & { user: { _id: string, id: string } }
  ): Promise<CertificatResponseDto> {
    // const userId = req.user._id;
    const userId = req.user._id ? (req.user._id) : (req.user.id);
    console.log(userId)
    return this.certificatsService.findById(userId);
  }

  @Get('public/:encodedUserId/:certificateId')
  @ApiOperation({ summary: 'Get public specific certificate by encoded user ID and certificate ID' })
  @ApiOkResponse({
    description: 'Certificate found',
    type: CertificatResponseDto
  })
  @ApiNotFoundResponse({ description: 'Certificate not found' })
  findPublic(
    @Param('encodedUserId') encodedUserId: string,
    @Param('certificateId') certificateId: string
  ): Promise<CertificatResponseDto> {
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf-8');
    return this.certificatsService.findSpecificCert(userId, certificateId);
  }

  @Get('link/:certificateId')
  @ApiOperation({ summary: 'Generate public link for specific certificate' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Link generated successfully',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string', example: 'http://localhost:3000/certificats/public/MTIzNDU=/cert123' }
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Certificate not found or does not belong to user' })
  async generateLink(
    @Param('certificateId') certificateId: string,
    @Req() req: Request & { user: { _id: string } }
  ): Promise<{ url: string }> {
    const userId = req.user._id;
    try {
      await this.certificatsService.findSpecificCert(userId, certificateId);
    } catch {
      throw new NotFoundException('Certificate not found or does not belong to user');
    }
    const encodedUserId = Buffer.from(userId).toString('base64');
    const baseUrl = this.configsService.get('url.base');
    const url = `${baseUrl}/certificats/public/${encodedUserId}/${certificateId}`;
    return { url };
  }

}
