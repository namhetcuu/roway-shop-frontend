"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// ✅ Tạo interface cụ thể thay vì dùng `any`
interface CredentialResponse {
  credential?: string;
  select_by?: string;
  clientId?: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: CredentialResponse) => void }) => void;
          renderButton: (element: HTMLElement | null, options: { theme: string; size: string }) => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const { googleSignIn } = useAuthContext();
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response: CredentialResponse) => {
        if (!response.credential) return;
        try {
          await googleSignIn(response.credential);
          console.log("✅ Google login thành công");
          router.push("/");
        } catch (err) {
          console.error("❌ Google login thất bại:", err);
        }
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, [googleSignIn, router]);

  return <div ref={buttonRef}></div>;
}
