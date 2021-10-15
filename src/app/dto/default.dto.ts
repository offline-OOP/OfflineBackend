import { ApiProperty } from '@nestjs/swagger';

export class DefaultDto {
  @ApiProperty({
    example: { host: 'localhost:3000', connection: 'keep-alive' },
  })
  headers: { [key in string]: string };

  @ApiProperty({ example: '::1' })
  ip: string;
}
