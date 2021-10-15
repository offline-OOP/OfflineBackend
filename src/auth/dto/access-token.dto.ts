import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({ example: 'longAccessTokenString' })
  accessToken: string;
}
