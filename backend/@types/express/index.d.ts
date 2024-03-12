// @types/express/index.d.ts

import { IUser } from "../../src/models/user"; // IUserのパスを適切に調整

declare global {
  namespace Express {
    export interface User extends IUser {}
    export interface Request {
      user?: User;
    }
  }
}
