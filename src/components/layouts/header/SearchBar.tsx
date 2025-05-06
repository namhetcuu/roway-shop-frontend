import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { useProducts } from '@/hooks/products/useProducts';
import { ProductResponse } from 'types/product/product-response.types';
import Image from 'next/image';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const { products, loading, searchProducts } = useProducts();

  // Tối ưu hóa useEffect để chỉ chạy khi isSearchOpen thay đổi
  useEffect(() => {
    if (isSearchOpen) {
      searchProducts(''); // Load tất cả sản phẩm khi mở search
    }
  }, [isSearchOpen, searchProducts]);

  // Tối ưu hóa các hàm bằng useCallback
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchTerm(query);
      searchProducts(query);
    },
    [searchProducts] // Chỉ khi searchProducts thay đổi mới chạy lại
  );

  const handleSelectSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      searchProducts(term);
      setIsSearchOpen(false);

      if (!recentSearches.includes(term)) {
        setRecentSearches([term, ...recentSearches.slice(0, 4)]);
      }
    },
    [recentSearches, searchProducts]
  );

  const handleOpenSearch = useCallback(() => {
    setIsSearchOpen(true);
    searchProducts(''); // Load sản phẩm khi mở search
  }, [searchProducts]);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
    setSearchTerm('');
  }, [recentSearches, searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, handleCloseSearch]);

  const renderSearchResults = () => {
    if (loading) {
      return <p className="text-center text-gray-500 py-2">Đang tải...</p>;
    }

    if (products.length === 0) {
      return <p className="text-center text-gray-500 py-2">Không tìm thấy sản phẩm nào</p>;
    }

    return products.map((item: ProductResponse) => (
      <div
        key={item.id}
        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer transition"
        onClick={() => handleSelectSearch(item.name)}
      >
        <Image
          src={item.mainImageUrl}
          alt={item.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-md object-cover mr-3"
        />
        <p className="text-sm">{item.name}</p>
      </div>
    ));
  };

  return (
    <>
      {/* Mobile Search Button */}
      <button
        onClick={handleOpenSearch}
        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
        aria-label="Open search"
      >
        <SearchIcon size={20} className="text-gray-700" />
      </button>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleOpenSearch}
        />
        <SearchIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
          onClick={handleOpenSearch}
          style={{ cursor: 'pointer' }}
        />

        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-2 z-50 overflow-hidden">
            {renderSearchResults()}
          </div>
        )}
      </div>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex flex-col">
          <div className="container mx-auto px-4 py-4 bg-white shadow-lg flex items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-12 pr-4 py-3 text-lg border-b-2 border-gray-300 focus:border-black outline-none transition"
                autoFocus
                value={searchTerm}
                onChange={handleSearch}
                aria-label="Search products"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>
            <button
              onClick={handleCloseSearch}
              className="ml-6 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close search"
            >
              <XIcon size={24} className="text-gray-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-white shadow-md">
            {renderSearchResults()}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
