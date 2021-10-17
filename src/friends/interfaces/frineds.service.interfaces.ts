import { DirectionEnum, PaginationInterface } from '@src/generic.interface';

export interface SendFriendRequestInterface {
  initiatorUserId: string; // id of user that sends friend request
  recipientUserId: string; // id of user that receives friend request
}

export interface FriendRequestExistsInterface
  extends SendFriendRequestInterface {
  direction: DirectionEnum;
}

export interface AcceptFriendRequestInterface {
  confirmedUserId: string; // id of user that confirmed friend request
  initiatorUserId: string; // id of user that initially sent friend request
}

export interface AreFriendsInterface {
  firstUserId: string;
  secondUserId: string;
}

export interface GetFriendRequestsInterface extends PaginationInterface {
  userId: string;
  direction: DirectionEnum;
}

export interface GetFriendsInterface extends PaginationInterface {
  userId: string;
}
