// Filter.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCategories, updateColors, updateSizes, updateTags, updatePriceRange, resetFilters, applyFilters } from "@/redux/slices/filterSlice";
import { useFilterOptions } from "@/hooks/filter/useFilter";
import { FilterSkeleton } from "@/components/products/FilterSkeleton";

const Filter = () => {
  const { options, loading: filterLoading } = useFilterOptions();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const [tempFilters, setTempFilters] = useState({
    categories: filters.categories,
    colors: filters.colors,
    sizes: filters.sizes,
    tags: filters.tags,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  const handleCategoryChange = (categoryId: number) => {
    const updatedCategories = tempFilters.categories.includes(categoryId)
      ? tempFilters.categories.filter(id => id !== categoryId)
      : [...tempFilters.categories, categoryId];
    setTempFilters({ ...tempFilters, categories: updatedCategories });
  };

  const handleColorChange = (color: string) => {
    const updatedColors = tempFilters.colors.includes(color)
      ? tempFilters.colors.filter(c => c !== color)
      : [...tempFilters.colors, color];
    setTempFilters({ ...tempFilters, colors: updatedColors });
  };

  const handleSizeChange = (size: string) => {
    const updatedSizes = tempFilters.sizes.includes(size)
      ? tempFilters.sizes.filter(s => s !== size)
      : [...tempFilters.sizes, size];
    setTempFilters({ ...tempFilters, sizes: updatedSizes });
  };

  const handleTagChange = (tag: string) => {
    const updatedTags = tempFilters.tags.includes(tag)
      ? tempFilters.tags.filter(t => t !== tag)
      : [...tempFilters.tags, tag];
    setTempFilters({ ...tempFilters, tags: updatedTags });
  };

  const handlePriceChange = (type: 'minPrice' | 'maxPrice', value: string) => {
    setTempFilters({ ...tempFilters, [type]: value });
  };

  const handleApplyFilters = () => {
    // Chỉ dispatch các filter có giá trị
    if (tempFilters.categories.length > 0) {
      dispatch(updateCategories(tempFilters.categories));
    } else {
      dispatch(updateCategories([]));
    }
    
    if (tempFilters.colors.length > 0) {
      dispatch(updateColors(tempFilters.colors));
    } else {
      dispatch(updateColors([]));
    }
    
    if (tempFilters.sizes.length > 0) {
      dispatch(updateSizes(tempFilters.sizes));
    } else {
      dispatch(updateSizes([]));
    }
    
    if (tempFilters.tags.length > 0) {
      dispatch(updateTags(tempFilters.tags));
    } else {
      dispatch(updateTags([]));
    }
    
    if (tempFilters.minPrice || tempFilters.maxPrice) {
      dispatch(updatePriceRange({ 
        min: tempFilters.minPrice, 
        max: tempFilters.maxPrice 
      }));
    } else {
      dispatch(updatePriceRange({ min: '', max: '' }));
    }
    
    dispatch(applyFilters());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setTempFilters({
      categories: [],
      colors: [],
      sizes: [],
      tags: [],
      minPrice: '',
      maxPrice: '',
    });
  };

  if (filterLoading || !options) {
    return <FilterSkeleton />;
  }


  return (
    <div className="hidden md:block w-64 flex-shrink-0 p-2">
      <div className="sticky top-24">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Bộ lọc sản phẩm</h2>
          <button onClick={handleResetFilters} className="text-sm text-gray-500 hover:text-gray-700">
            Đặt lại
          </button>
        </div>

        {/* Categories */}
        {options.categories?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Danh mục</h3>
            <div className="space-y-2">
              {options.categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    id={`category-${category.id}`}
                    type="checkbox"
                    checked={tempFilters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                  />
                  <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {options.colors?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Màu sắc</h3>
            <div className="flex flex-wrap gap-2">
              {options.colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${tempFilters.colors.includes(color) ? "ring-2 ring-offset-2 ring-red-500" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  aria-label={`Màu ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {options.sizes?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Kích thước</h3>
            <div className="flex flex-wrap gap-2">
              {options.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`py-1 px-3 border rounded-md text-sm font-medium ${tempFilters.sizes.includes(size)
                    ? "border-gray-200 bg-gray-400 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {options.tags?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {options.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`py-1 px-3 border rounded-md text-sm font-medium ${tempFilters.tags.includes(tag)
                    ? "border-gray-200 bg-gray-400 text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Khoảng giá</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm text-gray-600 mb-1">
                Từ
              </label>
              <input
                id="minPrice"
                type="number"
                value={tempFilters.minPrice || ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                placeholder="Thấp"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                min={0}
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm text-gray-600 mb-1">
                Đến
              </label>
              <input
                id="maxPrice"
                type="number"
                value={tempFilters.maxPrice || ''}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                placeholder="Cao"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                min={tempFilters.minPrice || 0}
              />
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={handleApplyFilters}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  );
};

export default Filter;
