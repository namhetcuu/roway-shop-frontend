// --- Address ---
export interface AddressResponse {
    id: number;
    recipientName: string;
    country: string;
    province: string;
    district: string;
    commune: string;
    addressLine: string;
    note?: string;
    phoneNumber: string;
    email: string;
    defaultAddress: boolean;
}