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
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { EventEntity } from '@src/events/events.entity';
import { CreatedDto } from '@src/generic.dto';
import { Acl } from '@src/casl/decorators/acl.decorator';
import { UpdateEventHandler } from '@src/casl/policies/events/update-event.handler';
import { CheckPolicies } from '@src/casl/decorators/check-policies.decorator';
import { RemoveEventHandler } from '@src/casl/policies/events/remove-event.handler';

@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@ApiResponse({
  status: 400,
  description: 'Bad request',
})
@ApiBearerAuth()
@ApiTags('Events')
@Controller('events')
@Acl(JwtAuthGuard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Record successfully created',
    type: CreatedDto,
  })
  @ApiOperation({ summary: 'Create event' })
  async create(
    @Req() req: AuthenticatedUserRequest,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventsService.create({
      event: createEventDto,
      ownerId: req.user.id,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiCreatedResponse({
    description: 'Record successfully retrieved',
    type: EventEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found',
  })
  @ApiOperation({ summary: 'Find one event by id' })
  async findOne(@Param('id') id: string): Promise<EventEntity> {
    const eventDb = await this.eventsService.findOne({ eventId: id });
    return new EventEntity({
      ...eventDb,
      //@ts-ignore
      owner: eventDb.owner.node,
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiCreatedResponse({
    description: 'Record successfully updated',
    type: EventEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiOperation({ summary: 'Update event by id' })
  @CheckPolicies(UpdateEventHandler)
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

  @Delete(':id')
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @CheckPolicies(RemoveEventHandler)
  @ApiOperation({ summary: 'Remove event by id' })
  async remove(@Param('id') id: string, @Req() req: AuthenticatedUserRequest) {
    await this.eventsService.remove({ eventId: id, user: req.user });
  }
}
