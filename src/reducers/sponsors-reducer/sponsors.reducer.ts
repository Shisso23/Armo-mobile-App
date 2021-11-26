import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SponsorsProps } from '../../models/app/sponsors/sponsors.model';
import { sponsorsTypesState } from './types';

const initialState: sponsorsTypesState = {
  sponsors: [],
  isLoadingSponsors: false,
};

const sponsorsSlice = createSlice({
  name: 'sponsors',
  initialState,
  reducers: {
    setsponsorsAction(state: any, action: PayloadAction<Array<SponsorsProps>>) {
      state.sponsors = action.payload;
    },

    setIsLoadingsponsorsAction(state: any, action: PayloadAction<Boolean>) {
      state.isLoadingSponsors = action.payload;
    },
  },
});

export const { setsponsorsAction, setIsLoadingsponsorsAction } = sponsorsSlice.actions;

export const sponsorsSelector = (reducers: any) => reducers.sponsorsReducer;

export default sponsorsSlice.reducer;
