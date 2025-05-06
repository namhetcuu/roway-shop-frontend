import { PaymentMethod } from "types/shared/enums";

export interface OrderResponse {
    [x: string]: any;
    id: number;
    userId: number;
    name: string;
    address: string;
    phoneNumber: string;
    notes: string;
    orderCode: string;
    status: string;
    paymentMethod: PaymentMethod;
    shippingFee: number;
    discountCode: string; 
    discountAmount: number;
    expectedDeliveryDate: string;
    orderItems: OrderItemResponse[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string; 
}


export interface OrderItemResponse {
    productId: number;
    productName: string;
    mainImageUrl: string;
    color: string;
    sizeName: string;
    quantity: number;
    price: number;
    subtotal: number;
}
