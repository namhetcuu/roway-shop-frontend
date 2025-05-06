"use client";

import { ReactNode } from "react";
import useAuth from "@/hooks/auth/useAuth";
import Link from "next/link";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <UserChecking>{children}</UserChecking>
    </main>
  );
}

function UserChecking({ children }: { children: ReactNode }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Đang tải...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h1 className="text-xl font-medium mb-4">Bạn chưa đăng nhập!</h1>
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
