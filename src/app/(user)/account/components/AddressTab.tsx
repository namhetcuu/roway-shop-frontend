"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { useAddresses } from "@/hooks/address/useAddress";
import { AddressResponse } from "types/address/address-response.type";

interface OptionType {
    value: number;
    label: string;
}

const AddressTab: React.FC = () => {
    const {
        addresses,
        loading,
        error,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
    } = useAddresses();

    const [provinces, setProvinces] = useState<OptionType[]>([]);
    const [districts, setDistricts] = useState<OptionType[]>([]);
    const [wards, setWards] = useState<OptionType[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [newAddress, setNewAddress] = useState<AddressResponse>({
        id: Date.now(),
        recipientName: "",
        country: "Việt Nam",
        province: "",
        district: "",
        commune: "",
        addressLine: "",
        note: "",
        phoneNumber: "",
        email: "",
        defaultAddress: false,
    });

    // Fetch provinces
    useEffect(() => {
        axios.get("https://provinces.open-api.vn/api/?depth=1").then((res) => {
            setProvinces(res.data.map((p: { code: number; name: string }) => ({ value: p.code, label: p.name })));
        });
    }, []);

    // Handle province change
    const handleProvinceChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, province: selected.label, district: "", commune: "" }));

        axios.get(`https://provinces.open-api.vn/api/p/${selected.value}?depth=2`).then((res) => {
            setDistricts(res.data.districts.map((d: { code: number; name: string }) => ({ value: d.code, label: d.name })));
            setWards([]);
        });
    };

    // Handle district change
    const handleDistrictChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, district: selected.label, commune: "" }));

        axios.get(`https://provinces.open-api.vn/api/d/${selected.value}?depth=2`).then((res) => {
            setWards(res.data.wards.map((w: { code: number; name: string }) => ({ value: w.code, label: w.name })));
        });
    };


    // Handle commune change
    const handleCommuneChange = (selected: SingleValue<OptionType>) => {
        if (!selected) return;
        setNewAddress(prev => ({ ...prev, commune: selected.label }));
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setNewAddress(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle edit address
    const handleEditAddress = (address: AddressResponse) => {
        setNewAddress(address);
        setEditingId(address.id);
    };

    // Reset form
    const resetForm = () => {
        setNewAddress({
            id: Date.now(),
            recipientName: "",
            country: "Việt Nam",
            province: "",
            district: "",
            commune: "",
            addressLine: "",
            note: "",
            phoneNumber: "",
            email: "",
            defaultAddress: false,
        });
        setEditingId(null);
    };

    // Add or update address
    const handleAddOrUpdateAddress = async () => {
        if (!newAddress.addressLine || !newAddress.phoneNumber || !newAddress.email) {
            alert("Vui lòng nhập đầy đủ thông tin địa chỉ!");
            return;
        }

        if (editingId) {
            await updateAddress(editingId, newAddress);
        } else {
            await addAddress(newAddress);
        }
        resetForm();
    };


    return (
        <div className="max-w-4xl mx-auto bg-white  rounded-lg shadow-sm">
            {/* Address List */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Địa chỉ giao hàng</h2>
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-4 mb-8">
                {addresses?.map((address) => (
                    <div
                        key={address.id}
                        className={`p-4 border rounded-lg ${address.defaultAddress
                            ? "border-gray-500 bg-white"
                            : "border-gray-200"
                            }`}
                    >
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <p className="font-medium text-gray-700">
                                    <span className="text-gray-600">Tên người nhận:</span>{" "}
                                    <span className="font-semibold">{address.recipientName}</span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-600">Địa chỉ:</span>{" "}
                                    {address.commune}, {address.district}, {address.province}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-700">
                                    <span className="text-gray-600">SĐT:</span> {address.phoneNumber}
                                </p>
                                <p className="text-gray-700">
                                    <span className="text-gray-600">Email:</span> {address.email}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-3">
                            <span className="text-gray-600">Địa chỉ chi tiết:</span> {address.addressLine}
                        </p>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setDefaultAddress(address.id)}
                                className={`px-3 py-1 text-sm rounded ${address.defaultAddress
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {address.defaultAddress ? "Mặc định" : "Đặt mặc định"}
                            </button>
                            <button
                                onClick={() => handleEditAddress(address)}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Chỉnh sửa
                            </button>
                            <button
                                onClick={() => removeAddress(address.id)}
                                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* Add/Edit Address Form */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="recipientName"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Tên người nhận"
                        value={newAddress.recipientName}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="block text-gray-700 mb-2">Tỉnh/Thành phố</label>
                        <Select
                            options={provinces}
                            onChange={handleProvinceChange}
                            placeholder="Chọn tỉnh/thành phố..."
                            value={provinces.find(option => option.label === newAddress.province)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Quận/Huyện</label>
                        <Select
                            options={districts}
                            onChange={handleDistrictChange}
                            placeholder="Chọn quận/huyện..."
                            isDisabled={!newAddress.province}
                            value={districts.find(option => option.label === newAddress.district)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">Xã/Phường</label>
                        <Select
                            options={wards}
                            onChange={handleCommuneChange}
                            placeholder="Chọn xã/phường..."
                            isDisabled={!newAddress.district}
                            value={wards.find(option => option.label === newAddress.commune)}
                        />
                    </div>

                    <input
                        type="text"
                        name="phoneNumber"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Số điện thoại"
                        value={newAddress.phoneNumber}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Email"
                        value={newAddress.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="addressLine"
                        className="w-full p-2 border rounded-lg"
                        placeholder="Địa chỉ chi tiết"
                        value={newAddress.addressLine}
                        onChange={handleChange}
                    />
                    <textarea name="note" className="w-full p-2 border rounded-lg" placeholder="Ghi chú (tuỳ chọn)" value={newAddress.note} onChange={handleChange} />

                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddOrUpdateAddress}
                            className="w-full py-2 text-white rounded-lg bg-black hover:bg-gray-800 transition-colors"
                        >
                            {editingId ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                        </button>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Hủy
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressTab;