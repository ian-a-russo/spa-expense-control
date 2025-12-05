import { AbstractHttp } from "./abstract.http";
import type { IExpenseHttp } from "@/services/http/expense/i-expense.http";
import type { IExpense } from "@/services/http/expense/i-expense";

export class ExpenseHttp
  extends AbstractHttp<IExpense>
  implements IExpenseHttp
{
  protected uri = "expenses";
}
