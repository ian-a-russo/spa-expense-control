import type { VerificationCodeType } from "./verification-code-type.enum";
import type { IAuthHttp } from "./i-auth.http";
import type { IUser } from "../user/i-user";
import { AbstractHttp } from "../axios/abstract.http";
import type { UserOptions } from "@/stores/user-session-store";

export class AuthHttp extends AbstractHttp<IUser> implements IAuthHttp {
  protected uri = "auth";

  async checkIfUserEmailExists(email: string) {
    const response = await this.http.get(this.uri + `/check-email/${email}`);

    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.http.post(this.uri + `/login`, {
      email,
      password,
    });

    return response.data;
  }

  async createVerificationCode(
    user: Partial<IUser>,
    type: VerificationCodeType
  ) {
    const response = await this.http.post(
      this.uri + `/verification-code/${type}`,
      {
        ...user,
      }
    );

    return response.data;
  }

  async validateVerificationCode(
    code: string,
    user: UserOptions,
    password?: string
  ) {
    const response = await this.http.put(
      this.uri + `/verification-code/${code}`,
      { ...user, password }
    );

    return response.data;
  }

  async me() {
    const response = await this.http.get(this.uri + `/me`);

    return response.data;
  }
}
