import { AbstractHttp } from "./abstract.http";
import type { ICategoryHttp } from "@/services/http/category/i-category.http";
import type { ICategory } from "@/services/http/category/i-category";

export class CategoryHttp
  extends AbstractHttp<ICategory>
  implements ICategoryHttp
{
  protected uri = "categories";
}
