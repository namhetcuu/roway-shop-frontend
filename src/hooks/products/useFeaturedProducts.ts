'use client';
import { useState, useCallback } from 'react';
import { getFeaturedProduct } from '@/services/productService';
import { ProductResponse } from 'types/product/product-response.types';

export const useFeaturedProducts = (initialPage = 0, initialPageSize = 8) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchFeaturedProducts = useCallback(async (page = initialPage, pageSize = initialPageSize) => {
    setLoading(true);
    try {
      const response = await getFeaturedProduct(page, pageSize);
      setProducts(response.data.items);
      setTotalItems(response.data.totalElements);
      setTotalPages(Math.ceil(response.data.totalElements / pageSize));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch featured products");
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [initialPage, initialPageSize]);

  return {
    products,
    loading,
    error,
    totalItems,
    totalPages,
    fetchFeaturedProducts,
  };
};
