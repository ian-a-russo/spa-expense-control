import { AbstractHttp } from "./abstract.http";
import type { IUserHttp } from "@/domain/services/http/user/i-user.http";
import type { IUser } from "@/domain/services/http/user/i-user";

export class UserHttp extends AbstractHttp<IUser> implements IUserHttp {
  protected uri = "users";
}
