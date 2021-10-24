import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FriendsService } from '@src/friends/friends.service';
import { SendFriendRequestDto } from '@src/friends/dto/send-friend-request.dto';
import { AcceptFriendRequestDto } from '@src/friends/dto/accept-friend-request.dto';
import { GetFriendsDto } from '@src/friends/dto/get-frineds.dto';
import { PaginationDto } from '@src/generic.dto';
import { UserEntity } from '@src/users/user.entity';
import { JwtAuthGuard } from '@src/auth/strategy/jwt-auth-guard';
import { AuthenticatedUserRequest } from '@src/generic.interface';

@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@ApiResponse({
  status: 400,
  description: 'Bad request',
})
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post('send-friend-request')
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  @ApiResponse({
    status: 422,
    description: 'Backend error',
  })
  @ApiOperation({ summary: 'Send friend request to another user' })
  async sendFriendRequest(
    @Body() sendFriendRequest: SendFriendRequestDto,
    @Req() req: AuthenticatedUserRequest,
  ) {
    await this.friendsService.sendFriendRequest({
      initiatorUserId: req.user.id,
      recipientUserId: sendFriendRequest.possibleFriendId,
    });
  }

  @Post('accept-friend-request')
  @ApiResponse({
    status: 422,
    description: 'Backend error',
  })
  @ApiOperation({ summary: 'Accept friend request from another user' })
  async acceptFriendRequest(
    @Body() acceptFriendRequest: AcceptFriendRequestDto,
    @Req() req: AuthenticatedUserRequest,
  ) {
    await this.friendsService.acceptFriendRequest({
      initiatorUserId: req.user.id,
      confirmedUserId: acceptFriendRequest.friendId,
    });
  }

  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    example: 1,
    description: 'Current page',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: true,
    example: 100,
    description: 'Number of records to get per page',
  })
  @ApiCreatedResponse({
    description: 'Record successfully retrieved',
    type: [UserEntity],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Get list of users friends' })
  @Get()
  async getFriends(
    @Req() req: AuthenticatedUserRequest,
    @Query() query: PaginationDto,
  ): Promise<UserEntity[]> {
    const friendsDb = await this.friendsService.getFriends({
      userId: req.user.id,
      page: query.page,
      limit: query.limit,
    });

    return friendsDb.map((friend) => {
      return new UserEntity(friend.get('friend').properties);
    });
  }

  @ApiQuery({
    name: 'page',
    type: 'number',
    required: true,
    example: 1,
    description: 'Current page',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: true,
    example: 100,
    description: 'Number of records to get per page',
  })
  @ApiQuery({
    name: 'direction',
    enum: ['in', 'out'],
    required: true,
    example: 'in',
    description: 'Incoming or outgoing requests',
  })
  @ApiCreatedResponse({
    description: 'Record successfully retrieved',
    type: [UserEntity],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('friend-requests')
  @ApiOperation({ summary: 'Get users friend requests' })
  async getFriendRequests(
    @Req() req: AuthenticatedUserRequest,
    @Query() query: GetFriendsDto,
  ): Promise<UserEntity[]> {
    const friendRequestsDb = await this.friendsService.getFriendRequests({
      userId: req.user.id,
      page: query.page,
      limit: query.limit,
      direction: query.direction,
    });

    return friendRequestsDb.map((friend) => {
      return new UserEntity(friend.get('friend').properties);
    });
  }
}
