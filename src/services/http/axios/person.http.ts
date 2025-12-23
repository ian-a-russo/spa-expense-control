import { AbstractHttp } from "./abstract.http";
import type { IPersonHttp } from "@/services/http/person/i-person.http";
import type { IPerson } from "@/services/http/person/i-person";

export class PersonHttp extends AbstractHttp<IPerson> implements IPersonHttp {
  protected uri = "persons";
}
