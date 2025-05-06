// src/redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductResponse } from 'types/product/product-response.types';

interface FilterState {
  categories: number[];
  colors: string[];
  sizes: string[];
  tags: string[];
  minPrice: string;
  maxPrice: string;
  appliedFilters: Record<string, string>;
  products: ProductResponse[];
  loading: boolean;
}

const initialState: FilterState = {
  categories: [],
  colors: [],
  sizes: [],
  tags: [],
  minPrice: '',
  maxPrice: '',
  appliedFilters: {},
  products: [],
  loading: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppliedFilters: (state, action: PayloadAction<Record<string, string>>) => {
      state.appliedFilters = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductResponse[]>) => {
      state.products = action.payload;
    },
    updateCategories: (state, action: PayloadAction<number[]>) => {
      state.categories = action.payload;
    },
    updateColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
    },
    updateSizes: (state, action: PayloadAction<string[]>) => {
      state.sizes = action.payload;
    },
    updateTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    updatePriceRange: (state, action: PayloadAction<{ min: string; max: string }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    applyFilters: (state) => {
      const appliedFilters: Record<string, string> = {};
      
      // Chỉ thêm các filter có giá trị
      if (state.categories.length > 0) {
        appliedFilters.categories = state.categories.join(',');
      }
      if (state.colors.length > 0) {
        appliedFilters.colors = state.colors.join(',');
      }
      if (state.sizes.length > 0) {
        appliedFilters.sizes = state.sizes.join(',');
      }
      if (state.tags.length > 0) {
        appliedFilters.tags = state.tags.join(',');
      }
      if (state.minPrice) {
        appliedFilters.minPrice = state.minPrice;
      }
      if (state.maxPrice) {
        appliedFilters.maxPrice = state.maxPrice;
      }
      
      state.appliedFilters = appliedFilters;
      state.loading = true;
    },
    removeFilter: (state, action: PayloadAction<keyof FilterState>) => {
      const key = action.payload;
      if (key === 'minPrice' || key === 'maxPrice') {
        state[key] = '';
      } else {
        state[key as 'categories' | 'colors' | 'sizes' | 'tags'] = [];
      }
      state.appliedFilters = {
        ...state.appliedFilters,
        [key]: '',
      };
    },
    resetFilters: (state) => {
      return { ...initialState, products: state.products };
    },
  },
});

export const {
  setLoading,
  setProducts,
  setAppliedFilters,
  updateCategories,
  updateColors,
  updateSizes,
  updateTags,
  updatePriceRange,
  applyFilters,
  removeFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;