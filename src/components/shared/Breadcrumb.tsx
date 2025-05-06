"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProductResponse } from "types/product/product-response.types";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const [product, setProduct] = useState<ProductResponse | null>(null);
  
  // Lấy slug danh mục từ URL (nếu có)
  const categorySlug = pathSegments.includes("categories") ? pathSegments.pop() : null;
  
  // Lấy slug sản phẩm từ URL (nếu có)
  const productSlug = pathSegments.includes("products") ? pathSegments.pop() : null;

  useEffect(() => {
    if (!productSlug) return; // Chỉ fetch API nếu là trang sản phẩm

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/slug/${productSlug}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");

        const data = await res.json();
        if (data?.data) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [productSlug]);

  return (
    <nav className="p-1 text-sm text-gray-600 ml-4">
      <ul className="flex space-x-2">
        {/* Trang chủ */}
        <li>
          <Link href="/" className="hover:underline">Trang chủ</Link>
          <span className="mx-2">/</span>
        </li>

        {/* Nếu đang ở danh mục */}
        {categorySlug && (
          <li className="text-gray-500 capitalize">
            {categorySlug.replace(/-/g, " ")}
          </li>
        )}

        {/* Nếu đang ở sản phẩm */}
        {product && (
          <>
            <li className="text-gray-500">{product.name}</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
