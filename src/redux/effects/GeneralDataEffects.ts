import {
  Action,
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { State } from '../store';
import { changeGeneralData } from '../GeneralDataSlice';
import { CalcService } from '../../services/CalcService';

export const updateTotalWeightEffect: Middleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, State>) =>
  (next: Dispatch) =>
  (action: Action) => {
    next(action);

    const triggerActions = [
      'objectsData/updateItemWeight',
      'basicData/updateEmptyWeight',
      'basicData/updateSlider1',
      'basicData/updateSlider2',
      'basicData/updateSlider3',
      'basicData/updateSlider4',
      'basicData/updateSlider5',
    ];

    if (triggerActions.includes(action.type)) {
      const state = store.getState();
      const calcService = new CalcService();

      store.dispatch(
        changeGeneralData({
          totalCargoWeight: calcService.totalAircraftWeight(
            state.basicData,
            state.objectsData.cargoList
          ),
        })
      );
    }
  };

export const updateTotalIndex: Middleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, State>) =>
  (next: Dispatch) =>
  (action: Action) => {
    next(action);

    const triggerActions = [
      'objectsData/updateItemIndex',
      'basicData/updateIndex',
    ];

    if (triggerActions.includes(action.type)) {
      store.dispatch(changeGeneralData({ totalIndex: 0 }));
    }
  };
