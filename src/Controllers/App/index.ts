import { Get, Controller, Request } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async default(@Request() req) {
    return { headers: req.headers, ip: req.ip };
  }
}
