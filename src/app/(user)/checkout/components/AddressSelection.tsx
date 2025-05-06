"use client";
import { MapPinIcon, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { useAddresses } from "@/hooks/address/useAddress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedAddress } from "@/redux/slices/addressSlice";
import { AddressSkeleton } from "@/components/address/AddressSkeleton";
import { AddressResponse } from "types/address/address-response.type";


const AddressSelection = () => {
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state: RootState) => state.address.selectedAddress);
  const { addresses, loading, error } = useAddresses();

  const handleSelectAddress = (address: AddressResponse) => {
    dispatch(setSelectedAddress(address));
  };

  if (loading) return <AddressSkeleton />;

  if (error) return (
    <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100 text-center">
      Đã xảy ra lỗi khi tải địa chỉ
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPinIcon className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-medium text-gray-800">
          Địa chỉ nhận hàng
        </h2>
      </div>

      {addresses?.length === 0 ? (
        <div className="text-center py-6 border rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-3">Bạn chưa có địa chỉ nào</p>
          <Link
            href="/account?tab=address"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" />
            Thêm địa chỉ mới
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses?.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${selectedAddress?.id === address.id 
                  ? "border-gray-400 bg-gray-50" 
                  : "border-gray-200 hover:bg-gray-50"}`}
              onClick={() => handleSelectAddress(address)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {address.recipientName}
                    </span>
                    {selectedAddress?.id === address.id && (
                      <span className="text-xs px-2 py-0.5 bg-gray-400 text-white rounded-full">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {address.addressLine}, {address.commune}, {address.district}, {address.province}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Điện thoại:</span> {address.phoneNumber}</p>
                    {address.email && <p><span className="font-medium">Email:</span> {address.email}</p>}
                  </div>
                </div>
                <Link 
                  href={`/account?tab=address`}
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {(addresses ?? []).length > 0 && (
        <Link
          href="/account?tab=address"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          Thêm địa chỉ mới
        </Link>
      )}
    </div>
  );
};

export default AddressSelection;