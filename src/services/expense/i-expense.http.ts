import type { IBaseHttp } from "../i-base.http";
import type { IExpense } from "./i-expense";

export interface IExpenseHttp extends IBaseHttp<IExpense> {}
