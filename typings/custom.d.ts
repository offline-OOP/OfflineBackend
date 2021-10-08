import { UserInterface } from '@src/users/interfaces/users.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: UserInterface;
  }
}
