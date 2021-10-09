import { Request } from 'express';
import { UserInterface } from '@src/users/interfaces/users.interface';

export interface PaginationInterface {
  page: number;
  limit: number;
}

export interface AuthenticatedUserRequest extends Request {
  user: UserInterface;
}
