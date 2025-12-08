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
}
