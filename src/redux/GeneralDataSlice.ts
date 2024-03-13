import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GeneralDataState {
  takeOffWeight: number;
  totalCargoWeight: number;
  totalIndex: number;
  ZFW: number;
  fuel: number;
  areaGraph: number;
  MAC: number;
  MACRange: number;
  index: number;
}

export interface GeneralDataStateChanges {
  takeOffWeight?: number;
  totalCargoWeight?: number;
  totalIndex?: number;
  ZFW?: number;
  fuel?: number;
  areaGraph?: number;
  MAC?: number;
  MACRange?: number;
  index?: number;
}

const initialState = {
  takeOffWeight: 0,
  totalCargoWeight: 0,
  totalIndex: 0,
  ZFW: 0,
  fuel: 0,
  areaGraph: 0,
  MAC: 0,
  MACRange: 0,
  index: 0,
};

const GeneralDataReducer = createSlice({
  name: 'generalData',
  initialState,
  reducers: {
    changeGeneralData: (
      state,
      action: PayloadAction<GeneralDataStateChanges>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default GeneralDataReducer.reducer;
export const { changeGeneralData } = GeneralDataReducer.actions;
