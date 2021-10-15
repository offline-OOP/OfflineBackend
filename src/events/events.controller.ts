import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/strategy/jwt-auth-guard';
import { CreateEventDto } from '@src/events/dto/create-event.dto';
import { UpdateEventDto } from '@src/events/dto/update-event.dto';
import { AuthenticatedUserRequest } from '@src/generic.interface';
import { EventsService } from '@src/events/events.service';
import { ApiBearerAuth, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { EventEntity } from '@src/events/events.entity';
import { CreatedDto } from '@src/generic.dto';

@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'Record successfully created',
    type: CreatedDto,
  })
  async create(
    @Req() req: AuthenticatedUserRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create({
      event: createEventDto,
      ownerId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'Record successfully retrieved',
    type: EventEntity,
  })
  async findOne(@Param('id') id: string): Promise<EventEntity> {
    const eventDb = await this.eventsService.findOne({ eventId: id });
    return new EventEntity({
      ...eventDb,
      //@ts-ignore
      owner: eventDb.owner.node,
    });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiCreatedResponse({
    description: 'Record successfully updated',
    type: EventEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: AuthenticatedUserRequest,
  ): Promise<EventEntity> {
    const eventDb = await this.eventsService.update({
      event: updateEventDto,
      eventId: id,
      user: req.user,
    });

    return new EventEntity({
      ...eventDb,
      //@ts-ignore
      owner: eventDb.owner.node,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedUserRequest) {
    await this.eventsService.remove({ eventId: id, user: req.user });
  }
}
