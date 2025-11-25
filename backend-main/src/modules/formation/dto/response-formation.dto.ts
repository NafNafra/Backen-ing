import { ApiProperty } from '@nestjs/swagger';

export class FormationResponseDto {
  @ApiProperty({ example: '65d0a4bfb663b65ff8d81144' })
  _id: string;

  @ApiProperty({ example: 'Web Fullstack' })
  name: string;

  @ApiProperty({ example: 'Learn modern fullstack development' })
  fullname: string;

  @ApiProperty({ example: '2025-06-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-06-01T00:00:00.000Z' })
  updatedAt: string;

  @ApiProperty({ example: false })
  inactive: boolean;

  constructor(partial: Partial<FormationResponseDto>) {
    Object.assign(this, partial);
  }
}
