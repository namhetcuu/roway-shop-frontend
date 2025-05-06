import { DiscountType } from "types/shared/enums";


declare interface DiscountPreviewResponse {
    discountCode: string;
    discountType: DiscountType;
    originalTotalAmount: number;
    discountAmount: number;
    finalAmount: number;
    valid: boolean;
    message: string;
}
