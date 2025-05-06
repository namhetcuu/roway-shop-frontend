import { DiscountType } from "types/shared/enums";

export interface DiscountResponse {
    id: number;
    code: string;
    discountAmount: number;
    maxDiscountAmount: number;
    discountType: DiscountType;
    minOrderValue: number;
    usageLimit: number;
    timesUsed: number;
    startDate: string;
    expiryDate: string;
    active: boolean;
    applicableProducts: number[];
    applicableUsers: number[];
    createdAt: string;
    updatedAt: string;
}

