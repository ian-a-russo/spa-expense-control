import type { IBaseHttp } from "../i-base.http";
import type { IPaymentMethod } from "./i-payment-method";

export interface IPaymentMethodHttp extends IBaseHttp<IPaymentMethod> {}
