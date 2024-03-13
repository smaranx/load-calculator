import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BasicDataState {
  cockpitCrew: number;
  loadmasters: number;
  emptyWeight: number;
  index: number;
  config: string;
  fuelPod: boolean;
  outboard: number;
  inboard: number;
  auxiliary: number;
  external: number;
}

export interface BasicDataChanges {
  cockpitCrew?: number;
  loadmasters?: number;
  emptyWeight?: number;
  index?: number;
  config?: string;
  fuelPod?: boolean;
  outboard?: number;
  inboard?: number;
  auxiliary?: number;
}

const initialState: BasicDataState = {
  cockpitCrew: 5,
  loadmasters: 3,
  emptyWeight: 84451,
  index: 82.6,
  config: '',
  fuelPod: false,
  outboard: 13000,
  inboard: 13000,
  auxiliary: 8000,
  external: 0,
};

const EditBasicDataSlice = createSlice({
  name: 'basicData',
  initialState,
  reducers: {
    // updateAllBasicDate:(state)=>{
    //   state.
    // },

    incrementCockpitCrew: (state) => {
      state.cockpitCrew += 1;
    },
    decrementCockpitCrew: (state) => {
      state.cockpitCrew -= 1;
    },
    incrementLoadmasters: (state) => {
      state.loadmasters += 1;
    },
    decrementLoadmasters: (state) => {
      state.loadmasters -= 1;
    },
    updateEmptyWeight: (state, action) => {
      if (!isNaN(action.payload)) {
        state.emptyWeight = action.payload;
      } else {
        return state;
      }
    },
    updateIndex: (state, action) => {
      if (!isNaN(action.payload)) {
        state.index = action.payload;
      } else {
        return state;
      }
    },
    updateConfig: (state, action) => {
      if (!isNaN(action.payload)) {
        state.config = action.payload;
      } else {
        return state;
      }
    },
    updateFuelPod: (state, action) => {
      if (!isNaN(action.payload)) {
        state.fuelPod = action.payload;
      } else {
        return state;
      }
    },
    updateBasicData: (
      state,
      action: PayloadAction<{ changes: BasicDataChanges }>
    ) => {
      return { ...state, ...action.payload.changes };
    },
    // updateBasicData: (
    //   state,
    //   action: PayloadAction<{ changes: BasicDataChanges }>
    // ) => {
    //   return { ...state, ...action.payload.changes };
    // },
  },
});

export const {
  incrementCockpitCrew,
  decrementCockpitCrew,
  incrementLoadmasters,
  decrementLoadmasters,
  updateEmptyWeight,
  updateIndex,
  updateConfig,
  updateFuelPod,
  updateBasicData,
} = EditBasicDataSlice.actions;
export default EditBasicDataSlice.reducer;
