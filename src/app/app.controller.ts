import { Get, Controller, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DefaultDto } from '@src/app/dto/default.dto';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get headers and ip' })
  @ApiResponse({
    status: 200,
    type: DefaultDto,
    description: 'Success',
  })
  async default(@Request() req) {
    return { headers: req.headers, ip: req.ip };
  }
}
