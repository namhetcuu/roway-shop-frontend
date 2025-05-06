// redux/favouriteSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouriteResponse } from 'types/favourite/favourite-response.type';

interface FavouriteState {
  favourites: FavouriteResponse[];
}

const initialState: FavouriteState = {
  favourites: [],
};

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<FavouriteResponse>) => {
      const newFavourite = action.payload;
      if (!state.favourites.some((fav) => fav.id === newFavourite.id)) {
        state.favourites.push(newFavourite); 
      }
    },
    removeFav: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter((fav) => fav.id !== action.payload);
    },
    setFav: (state, action: PayloadAction<FavouriteResponse[]>) => {
      state.favourites = action.payload;
    }
  },
});

export const { addFav, removeFav, setFav } = favouriteSlice.actions;
export default favouriteSlice.reducer;
