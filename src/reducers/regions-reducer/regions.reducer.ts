import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { regionsTypesState } from './types';

const initialState: regionsTypesState = {
  regions: [],
};

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegionsAction(state: any, action: PayloadAction<Array<string>>) {
      state.regions = action.payload;
    },
  },
});

export const { setRegionsAction } = regionsSlice.actions;

export const regionsSelector = (reducers: any) => reducers.regionsReducer;

export default regionsSlice.reducer;
