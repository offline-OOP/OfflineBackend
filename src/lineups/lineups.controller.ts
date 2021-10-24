import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/strategy/jwt-auth-guard';
import { CreatedDto } from '@src/generic.dto';
import { AuthenticatedUserRequest } from '@src/generic.interface';
import { CreateLineupDto } from '@src/lineups/dto/create-lineup.dto';
import { UpdateLineupDto } from '@src/lineups/dto/update-lineup.dto';
import { LineupsService } from '@src/lineups/lineups.service';
import { LineupsEntity } from '@src/lineups/lineups.entity';

@ApiBearerAuth()
@ApiResponse({
  status: 403,
  description: 'Forbidden',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@UseGuards(JwtAuthGuard)
@ApiTags('Lineups')
@Controller('events/:eventId/lineups')
export class LineupsController {
  constructor(private lineupsService: LineupsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Record successfully created',
    type: CreatedDto,
  })
  @ApiOperation({ summary: 'Create lineup' })
  async create(
    @Req() req: AuthenticatedUserRequest,
    @Body() createLineupDto: CreateLineupDto,
    @Param('eventId') eventId: string,
  ) {
    return this.lineupsService.create({
      user: req.user,
      lineup: createLineupDto,
      eventId,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lineup' })
  @ApiCreatedResponse({
    description: 'Record successfully updated',
    type: LineupsEntity,
  })
  async update(
    @Req() req: AuthenticatedUserRequest,
    @Body() updateLineupDto: UpdateLineupDto,
    @Param('eventId') eventId: string,
    @Param('id') id: string,
  ) {
    return this.lineupsService.update({
      user: req.user,
      lineup: updateLineupDto,
      lineupId: id,
      eventId,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'Remove lineup by id' })
  async remove(
    @Param('eventId') eventId: string,
    @Param('id') id: string,
    @Req() req: AuthenticatedUserRequest,
  ) {
    await this.lineupsService.remove({
      user: req.user,
      lineupId: id,
      eventId,
    });
  }
}
