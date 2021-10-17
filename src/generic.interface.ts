import { Request } from 'express';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface PaginationInterface {
  page: number;
  limit: number;
}

export interface AuthenticatedUserRequest extends Request {
  user: UserInterface;
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
