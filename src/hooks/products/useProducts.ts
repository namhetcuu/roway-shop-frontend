'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  searchProductsByName,
} from '@/services/productService';
import { ProductResponse } from 'types/product/product-response.types';
import { ApiResponse, PaginatedResponse } from 'types/api-response.type';

export const useProducts = (
  slug?: string,
  initialPage = 1,
  initialPageSize = 10
) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Add searchQuery state

  // Utility function to handle the pagination response
  const handleResponsePagination = useCallback(
    (response: ApiResponse<PaginatedResponse<ProductResponse>>) => {
      setProducts(response.data.items);
      setTotalItems(response.data.totalElements);
      setTotalPages(Math.ceil(response.data.totalElements / initialPageSize));
      setError(null);
    },
    [initialPageSize]  // Use initialPageSize here as the size is fixed initially
  );

  // Utility function for centralized error handling
  const handleError = (err: unknown, message: string) => {
    setError(err instanceof Error ? err.message : message);
    setProducts([]);  // Clear the products on error
    setTotalItems(0);  // Reset total items
    setTotalPages(1);  // Reset total pages
  };

  // Fetch products based on the category or general fetch
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = slug
        ? await getProductsByCategory(slug, page - 1, initialPageSize)
        : await getProducts(page - 1, initialPageSize);
      handleResponsePagination(response);
    } catch (err) {
      handleError(err, 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [slug, page, initialPageSize, handleResponsePagination]);

  // Search products by name
  const searchProducts = useCallback(
    async (query: string) => {
      setLoading(true);
      try {
        const response = await searchProductsByName(query, page - 1, initialPageSize);
        handleResponsePagination(response);
      } catch (err) {
        handleError(err, 'Failed to search products');
      } finally {
        setLoading(false);
      }
    },
    [page, initialPageSize, handleResponsePagination]
  );

  // Fetch product details by ID
  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      handleError(err, 'Failed to fetch product by ID');
      setSelectedProduct(null);  // Ensure selectedProduct is null on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch product details by slug
  const fetchProductBySlug = useCallback(async (slug: string) => {
    setLoading(true);
    try {
      const response = await getProductBySlug(slug);
      setSelectedProduct(response.data);
      setError(null);
    } catch (err) {
      handleError(err, 'Failed to fetch product by slug');
      setSelectedProduct(null);  // Ensure selectedProduct is null on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new product
  const createNewProduct = useCallback(
    async (productData: FormData) => {
      setLoading(true);
      try {
        const response = await createProduct(productData);
        setProducts((prev) => [response.data, ...prev]); // Add new product to the list
        const newTotal = totalItems + 1;
        setTotalItems(newTotal);
        setTotalPages(Math.ceil(newTotal / initialPageSize)); // Update total pages
        setError(null);
        return response.data;
      } catch (err) {
        handleError(err, 'Error adding product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [totalItems, initialPageSize]
  );

  // Update an existing product
  const updateExistingProduct = useCallback(
    async (id: number, productData: FormData) => {
      setLoading(true);
      try {
        const response = await updateProduct(id, productData);
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? response.data : product))
        );
        setSelectedProduct((prev) => (prev?.id === id ? response.data : prev));  // Update selected product
        setError(null);
        return response.data;
      } catch (err) {
        handleError(err, 'Error updating product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete an existing product
  const deleteExistingProduct = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await deleteProduct(id);
        const updatedProducts = products.filter((p) => p.id !== id);
        const newTotal = totalItems - 1;
        setProducts(updatedProducts);
        setTotalItems(newTotal);
        setTotalPages(Math.ceil(newTotal / initialPageSize));
        if (updatedProducts.length === 0 && page > 1) {
          setPage(page - 1); // Adjust page if needed
        }
        setError(null);
      } catch (err) {
        handleError(err, 'Error deleting product');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [products, totalItems, page, initialPageSize]
  );

  // Filter products based on filters
  const filterProductsList = useCallback(
    async (filters: Record<string, string>) => {
      setLoading(true);
      try {
        const response = await filterProducts(filters, page - 1, initialPageSize);
        handleResponsePagination(response);
      } catch (err) {
        handleError(err, 'Failed to filter products');
      } finally {
        setLoading(false);
      }
    },
    [page, initialPageSize, handleResponsePagination]
  );

  // Effect to fetch products or search results when dependencies change
  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery);
    } else {
      fetchProducts();
    }
  }, [searchQuery, fetchProducts, searchProducts]);

  return {
    products,
    selectedProduct,
    loading,
    error,
    page,
    totalPages,
    totalItems,
    setPage,
    searchQuery,
    setSearchQuery,
    searchProducts,
    fetchProducts,
    fetchProductById,
    fetchProductBySlug,
    filterProducts: filterProductsList,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
  };
};
