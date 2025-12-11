import type { ICategory } from "../category/i-category";
import type { IPerson } from "../person/i-person";

export interface IExpense {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  personId: number;
  paymentMethodId: number;
  person?: IPerson;
  category?: ICategory;
}
