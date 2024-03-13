import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cargo, Position } from '../models/ObjectItem';
import UnitsService from '../services/UnitsService';

export interface ObjectsDataState {
  cargoList: Cargo[];
  selectedCargo?: Cargo;
}

export interface PositionChanges {
  x?: number;
  y?: number;
  z?: number;
}

const initialState: ObjectsDataState = {
  cargoList: [],
  selectedCargo: undefined,
};

const unitsService = new UnitsService();

const ObjectsDataSlice = createSlice({
  name: 'objectsData',
  initialState,
  reducers: {
    setItemsList: (state, action) => {
      state.cargoList = action.payload;
    },
    addItem: (state, action) => {
      state.cargoList.push(action.payload);
    },
    deleteItem(state, action) {
      state.cargoList = state.cargoList.filter(
        (cargo) => cargo.id !== action.payload
      );
    },
    deleteAll(state) {
      state.cargoList = [];
    },
    setSelectedCargoById: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.selectedCargo = state.cargoList.find(
        (cargo) => cargo.id === action.payload
      );
    },
    updateItemWeight: (
      state,
      action: PayloadAction<{ id: string; updatedWeight: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            weight: action.payload.updatedWeight,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemWidth: (
      state,
      action: PayloadAction<{ id: string; updatedWidth: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            width: action.payload.updatedWidth,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemLength: (
      state,
      action: PayloadAction<{ id: string; updatedLength: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            length: action.payload.updatedLength,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemIndex: (
      state,
      action: PayloadAction<{ id: string; updatedIndex: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            index: action.payload.updatedIndex,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemFs: (
      state,
      action: PayloadAction<{ id: string; updatedFs: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            fs: action.payload.updatedFs,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemPosition: (
      state,
      action: PayloadAction<{ id: string; updatedPosition: Partial<Position> }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            position: {
              ...cargo.position,
              ...action.payload.updatedPosition,
            },
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemScale: (
      state,
      action: PayloadAction<{ id: string; scaleX: number; scaleY: number }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            width: unitsService.ONE_UNIT_IN_INCHES * action.payload.scaleY,
            length: unitsService.ONE_UNIT_IN_INCHES * action.payload.scaleX,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemCenterOfGravity: (
      state,
      action: PayloadAction<{
        id: string;
        updatedCenterOfGravity: PositionChanges;
      }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject: Cargo = {
            ...cargo,
            centerOfGravity: {
              ...cargo.centerOfGravity,
              ...action.payload.updatedCenterOfGravity,
            },
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItemName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject = {
            ...cargo,
            name: action.payload.name,
          };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
    updateItem: (state, action) => {
      state.cargoList = state.cargoList.map((cargo) => {
        if (cargo.id === action.payload.id) {
          const modifiedObject = { ...cargo, ...action.payload.changes };
          state.selectedCargo = modifiedObject;
          return modifiedObject;
        }

        return cargo;
      });
    },
  },
});

export default ObjectsDataSlice.reducer;
export const {
  setItemsList,
  addItem,
  deleteItem,
  deleteAll,
  setSelectedCargoById,
  updateItemWeight,
  updateItemWidth,
  updateItemLength,
  updateItemIndex,
  updateItemFs,
  updateItemPosition,
  updateItemScale,
  updateItemCenterOfGravity,
  updateItemName,
} = ObjectsDataSlice.actions;
