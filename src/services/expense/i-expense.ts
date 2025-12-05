import type { ICategory } from "../category/i-category";
import type { IFavoriteExpense } from "../favorite-expense/i-favorite-expense";
import type { IUser } from "../user/i-user";

export interface IExpense {
  id: number;
  name: string;
  description?: string;
  price: number;
  imagePath: string;
  categoryId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  category?: ICategory;
  favoriteExpenses?: IFavoriteExpense[];
  user?: IUser;
}
