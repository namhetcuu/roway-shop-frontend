// shared/enums.ts
export enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED",
}

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

// 🔵 Enum cho phương thức thanh toán
export enum PaymentMethod {
    COD = "COD",
    VNPAY = "VNPAY",
    VIETQR = "VIETQR",
    BANK_TRANSFER = "BANK_TRANSFER",
  }
  