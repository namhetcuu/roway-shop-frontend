import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { HeartIcon, TrashIcon, SearchIcon } from 'lucide-react'
import { useFavourite } from '@/hooks/users/useFavourite'
import Image from 'next/image'
import { FavouriteResponse } from 'types/favourite/favourite-response.type'

export function Favorites() {
  const { favourites, loading, pagination, removeFavourite, goToNextPage, goToPreviousPage } = useFavourite()
  const [sortBy, setSortBy] = useState('date-desc')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Lọc danh sách yêu thích theo từ khóa tìm kiếm
  const filteredItems = favourites.filter((item: FavouriteResponse) => {
    if (searchQuery && !item.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sắp xếp danh sách yêu thích
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.nameProduct.localeCompare(b.nameProduct)
      case 'name-desc':
        return b.nameProduct.localeCompare(a.nameProduct)
      default:
        return 0
    }
  })

  useEffect(() => {
    console.log('Favourites:', favourites)
  }, [favourites])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <HeartIcon size={28} />
          <h1 className="text-2xl font-bold">Danh sách yêu thích</h1>
          <span className="text-gray-500 text-sm">({favourites.length} sản phẩm)</span>
        </div>
      </div>

      {/* Hiển thị loading */}
      {loading ? (
        <div className="text-center py-12">Đang tải danh sách yêu thích...</div>
      ) : favourites.length > 0 ? (
        <>
          {/* Bộ lọc và sắp xếp */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Tìm kiếm */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <SearchIcon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm trong danh sách yêu thích..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              {/* Lọc danh mục và sắp xếp */}
              <div className="flex gap-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="Áo sơ mi">Áo sơ mi</option>
                  <option value="Áo polo">Áo polo</option>
                  <option value="Áo thun">Áo thun</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="date-desc">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                  <option value="name-asc">Tên A-Z</option>
                  <option value="name-desc">Tên Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danh sách sản phẩm yêu thích */}
          <div className="grid gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 bg-white rounded-lg shadow-sm">
                <Link href={`/products/${item.productUrl}`} className="sm:w-48 h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.nameProduct}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <Link href={`/products/${item.productUrl}`} className="text-2xl font-medium hover:text-gray-600">
                      {item.nameProduct}
                    </Link>
                    <span className={`text-sm ${item.stockStatus ? 'text-green-600' : 'text-red-500'}`}>
                      {item.stockStatus ? 'Còn hàng' : 'Hết hàng'}
                    </span>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {/* <button
                      disabled={!item.stockStatus}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${item.stockStatus ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} transition-colors`}
                    >
                      <ShoppingCartIcon size={18} />
                      <span>Thêm vào giỏ</span>
                    </button> */}
                    <button
                      onClick={() => removeFavourite(item.id)}
                      className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon size={18} />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={goToPreviousPage}
              disabled={pagination.currentPage === 0}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="text-sm text-gray-500">
              Trang {pagination.currentPage + 1} / {pagination.totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pagination.currentPage + 1 === pagination.totalPages}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <HeartIcon size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-8">Chưa có sản phẩm nào trong danh sách yêu thích</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Tiếp tục mua sắm
          </Link>
        </div>
      )}
    </div>
  )
}
