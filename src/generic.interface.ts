import { Request } from 'express';
import { UserInterface } from '@src/users/interfaces/users.interface';
import { EventEntity } from '@src/events/events.entity';

export interface PaginationInterface {
  page: number;
  limit: number;
}

export interface AuthenticatedUserRequest extends Request {
  user: UserInterface;
  data?: RequestData;
}

export interface RequestData {
  event?: EventEntity;
}

export enum Action {
  MANAGE = 'MANAGE',
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum DirectionEnum {
  in = 'in',
  out = 'out',
  direction_both = 'direction_both',
}
