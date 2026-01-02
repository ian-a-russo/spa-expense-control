import type { VerificationCodeType } from "./verification-code-type.enum";
import type { IBaseHttp } from "../i-base.http";
import type { IUser } from "../user/i-user";

export interface IAuthHttp extends IBaseHttp<IUser> {
  checkIfUserEmailExists(email: string): Promise<string | boolean>;
  createVerificationCode(
    user: Partial<IUser>,
    type: VerificationCodeType
  ): Promise<boolean>;
  validateVerificationCode(
    code: string,
    user: Partial<IUser>,
    password?: string
  ): Promise<void>;
  login(email: string, password: string): Promise<string>;
  me(): Promise<Partial<IUser>>;
}
