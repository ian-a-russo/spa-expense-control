import { ExpenseHttp } from "./expense.http";

class HttpCoordinator {
  get expense(): ExpenseHttp {
    return new ExpenseHttp();
  }
}

export const httpCoordinator = new HttpCoordinator();
