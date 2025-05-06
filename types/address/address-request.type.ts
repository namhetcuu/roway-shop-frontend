// --- Address ---
export interface AddressRequest {
    recipientName: string;
    country: string;
    province: string;
    district: string;
    commune: string;
    note?: string;
    addressLine: string;
    email: string;
    phoneNumber: string;
    defaultAddress: boolean;
}