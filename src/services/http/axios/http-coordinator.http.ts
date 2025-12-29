import { CategoryHttp } from "./category.http";
import { ExpenseHttp } from "./expense.http";
import { PaymentMethodHttp } from "./payment-method.http";
import { FamiliarityHttp } from "./familiarity.http";
import { PersonHttp } from "./person.http";

class HttpCoordinator {
  get expense(): ExpenseHttp {
    return new ExpenseHttp();
  }

  get person(): PersonHttp {
    return new PersonHttp();
  }

  get category(): CategoryHttp {
    return new CategoryHttp();
  }

  get paymentMethod(): PaymentMethodHttp {
    return new PaymentMethodHttp();
  }

  get familiarity(): FamiliarityHttp {
    return new FamiliarityHttp();
  }
}

export const httpCoordinator = new HttpCoordinator();
