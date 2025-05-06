"use client"; // Chỉ định đây là một client component

import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //Phải có dòng này toast mới hoạt động

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="layout min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
                <div className="layout min-h-screen flex flex-col bg-gray-100 text-gray-900">
                  {!isAdminRoute && <Header />}
                  <main className="flex-grow">{children}</main>
                  {!isAdminRoute && <Footer />}
                </div>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
