import { AbstractHttp } from "./abstract.http";
import type { IFamiliarityHttp } from "@/services/http/familiarity/i-familiarity.http";
import type { IFamiliarity } from "@/services/http/familiarity/i-familiarity";

export class FamiliarityHttp
  extends AbstractHttp<IFamiliarity>
  implements IFamiliarityHttp
{
  protected uri = "familiarities";
}
