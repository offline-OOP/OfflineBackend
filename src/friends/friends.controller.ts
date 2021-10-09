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
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FriendsService } from '@src/friends/friends.service';
import { SendFriendRequestDto } from '@src/friends/dto/send-friend-request.dto';
import { AcceptFriendRequestDto } from '@src/friends/dto/accept-friend-request.dto';
import { GetFriendsDto } from '@src/friends/dto/get-frineds.dto';
import { PaginationDto } from '@src/generic.dto';
import { UserEntity } from '@src/users/user.entity';
import { JwtAuthGuard } from '@src/auth/strategy/jwt-auth-guard';
import { AuthenticatedUserRequest } from '@src/generic.interface';

@ApiBearerAuth()
@ApiTags('Friends')
@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-friend-request')
  async sendFriendRequest(
    @Body() sendFriendRequest: SendFriendRequestDto,
    @Req() req: AuthenticatedUserRequest,
  ) {
    await this.friendsService.sendFriendRequest({
      initiatorUserId: req.user.id,
      recipientUserId: sendFriendRequest.possibleFriendId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('accept-friend-request')
  async acceptFriendRequest(
    @Body() acceptFriendRequest: AcceptFriendRequestDto,
    @Req() req: AuthenticatedUserRequest,
  ) {
    await this.friendsService.acceptFriendRequest({
      initiatorUserId: req.user.id,
      confirmedUserId: acceptFriendRequest.friendId,
    });
  }

  @UseGuards(JwtAuthGuard)
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
  @UseInterceptors(ClassSerializerInterceptor)
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

  @UseGuards(JwtAuthGuard)
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('friend-requests')
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
