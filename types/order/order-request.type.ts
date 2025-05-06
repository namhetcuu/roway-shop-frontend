import { PaymentMethod } from "types/shared/enums";

export interface OrderRequest {
    addressId: number;
    cartId: number;
    discountCode?: string;
    paymentMethod: PaymentMethod;
}
