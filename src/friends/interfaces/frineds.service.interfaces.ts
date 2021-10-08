export interface SendFriendRequestInterface {
  initiatorUserId: string; // id of user that sends friend request
  recipientUserId: string; // id of user that receives friend request
}

export interface AcceptFriendRequestInterface {
  confirmedUserId: string; // id of user that confirmed friend request
  initiatorUserId: string; // id of user that initially sent friend request
}

export interface AreFriendsInterface {
  firstUserId: string;
  secondUserId: string;
}
