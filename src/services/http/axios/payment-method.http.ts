import { AbstractHttp } from "./abstract.http";
import type { IPaymentMethodHttp } from "@/services/http/payment-method/i-payment-method.http";
import type { IPaymentMethod } from "@/services/http/payment-method/i-payment-method";

export class PaymentMethodHttp
  extends AbstractHttp<IPaymentMethod>
  implements IPaymentMethodHttp
{
  protected uri = "payment-methods";
}
