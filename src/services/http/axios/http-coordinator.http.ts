import { ExpenseHttp } from "./expense.http";
import { PersonHttp } from "./person.http";

class HttpCoordinator {
  get expense(): ExpenseHttp {
    return new ExpenseHttp();
  }

  get person(): PersonHttp {
    return new PersonHttp();
  }
}

export const httpCoordinator = new HttpCoordinator();
