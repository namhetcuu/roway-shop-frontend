"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    UserIcon,
    PackageIcon,
    Key,
    Home,
    HandHelping,
    MessageSquareHeart,
} from "lucide-react";
import toast from "react-hot-toast";

// Tabs
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import ChangePasswordTab from "./ChangePasswordTab";
import AddressTab from "./AddressTab";
import HelpTab from "./HelpTab";
import FeedbackTab from "./FeedbackTab";

// Hooks
import { useUser } from "@/hooks/users/useUser";

// Tab definitions
const tabs = [
    {
        id: "profile",
        label: "Thông tin cá nhân",
        icon: UserIcon,
        component: <ProfileTab />,
    },
    {
        id: "address",
        label: "Địa chỉ giao hàng",
        icon: Home,
        component: <AddressTab />,
    },
    {
        id: "orders",
        label: "Đơn hàng của tôi",
        icon: PackageIcon,
        component: <OrdersTab />,
    },
    {
        id: "help",
        label: "Hỗ trợ",
        icon: HandHelping,
        component: <HelpTab />,
    },
    {
        id: "feedback",
        label: "Góp ý - Phản hồi",
        icon: MessageSquareHeart,
        component: <FeedbackTab />,
    },
    {
        id: "change-password",
        label: "Đổi mật khẩu",
        icon: Key,
        component: <ChangePasswordTab />,
    },
];

export function UserProfile() {
    const { user, fetchCurrentUser } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("tab") || "profile";

    useEffect(() => {
        fetchCurrentUser().catch(() => {
            toast.error("⚠️ Lỗi khi tải thông tin người dùng!");
        });
    }, [fetchCurrentUser]);

    const handleTabChange = (tabId: string) => {
        router.push(`?tab=${tabId}`, { scroll: false });
    };

    const activeComponent =
        tabs.find((tab) => tab.id === activeTab)?.component || <ProfileTab />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar menu */}
                <div className="w-full md:w-64 space-y-4 sticky top-0 overflow-y-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        {/* User info */}
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <UserIcon size={40} className="text-gray-400" />
                            </div>
                            <h2 className="font-medium">{user?.username || "Người dùng"}</h2>
                            <p className="text-gray-600 text-sm">
                                {user?.email || "Chưa có email"}
                            </p>
                            {user?.bio && (
                                <p className="text-gray-500 text-sm mt-2">{user.bio}</p>
                            )}
                        </div>

                        {/* Tab navigation */}
                        <div className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeTab === tab.id
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-50"
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tab content */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    {activeComponent}
                </div>
            </div>
        </div>
    );
}
