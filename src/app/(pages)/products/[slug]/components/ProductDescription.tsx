"use client";

import React from 'react';
import { ProductResponse } from 'types/product/product-response.types';

interface ProductDescriptionProps {
  product: ProductResponse;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 md:p-8">


        {/* Full description */}
        <div className="prose max-w-none prose-p:text-gray-600 text-lg prose-p:leading-relaxed prose-li:marker:text-gray-400 prose-ul:pl-5">
          {product.description ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Sản phẩm chưa có mô tả chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;