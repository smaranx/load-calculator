import ObjectsDataSliceReducer, { ObjectsDataState } from './ObjectsDataSlice';
import EditBasicDataReducer, { BasicDataState } from './BasicDataSlice';
import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import PopupSliceReducer, { PopupState } from './PopupSlice';
import GeneralDataSlice, { GeneralDataState } from './GeneralDataSlice';

export type State = {
  objectsData: ObjectsDataState;
  basicData: BasicDataState;
  popupData: PopupState;
  generalData: GeneralDataState;
};

//@ts-ignore
const logger: Middleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, State>) =>
  (next: Dispatch) =>
  (action: Action) => {
    console.group(action.type);
    console.log(action.type);
    let result = next(action);
    console.log(store.getState());
    console.groupEnd();
    return result;
  };

const objectsDataToLocalStorage: Middleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, State>) =>
  (next: Dispatch) =>
  (action: Action) => {
    let result = next(action);

    if (action.type.includes('objectsData')) {
      localStorage.setItem(
        'objectsList',
        JSON.stringify(store.getState().objectsData.cargoList)
      );
    }

    return result;
  };

export const store = configureStore({
  reducer: {
    objectsData: ObjectsDataSliceReducer,
    basicData: EditBasicDataReducer,
    popupData: PopupSliceReducer,
    generalData: GeneralDataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(objectsDataToLocalStorage),
});
