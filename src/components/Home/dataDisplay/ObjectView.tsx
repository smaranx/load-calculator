import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Position } from '../../../models/ObjectItem';
import {
  deleteItem,
  updateItemFs,
  updateItemLength,
  updateItemName,
  updateItemPosition,
  updateItemWeight,
  updateItemWidth,
} from '../../../redux/ObjectsDataSlice';
import { State } from '../../../redux/store';
import UnitsService from '../../../services/UnitsService';
import { CanvasCTX } from '../Grid/CanvasContext';

export const ObjectView = () => {
  const selectedCargo = useSelector(
    (state: State) => state.objectsData.selectedCargo
  );

  const dispatch = useDispatch();

  const grid = useContext(CanvasCTX).canvas;

  const unitsService = new UnitsService();

  useEffect(() => {}, [selectedCargo]);

  const deleteObject = () => {
    const currentObj = grid?.getActiveObject();
    if (currentObj) {
      grid?.remove(currentObj);
      dispatch(deleteItem(currentObj?.name));
    }
  };

  const lengthChangeHandler = (value: number) => {
    const currentObj = grid?.getActiveObject();

    if (currentObj) {
      currentObj.scaleX = value / unitsService.ONE_UNIT_IN_INCHES;
      grid?.requestRenderAll();

      dispatch(
        updateItemLength({
          id: currentObj.name!,
          updatedLength: value,
        })
      );

      dispatch(
        updateItemFs({
          id: currentObj.name!,
          updatedFs:
            unitsService.pixelsToInches(
              currentObj.left! -
                unitsService.startingPosition(grid!.width!, grid!.height!).left,
              grid!.getWidth()
            ) +
            245 +
            (20 * currentObj.scaleX) / 2,
        })
      );
    }
  };

  const widthChangeHandler = (value: number) => {
    const currentObj = grid?.getActiveObject();

    if (currentObj) {
      currentObj.scaleY = value / unitsService.ONE_UNIT_IN_INCHES;
      grid?.requestRenderAll();

      dispatch(
        updateItemWidth({
          id: currentObj.name!,
          updatedWidth: value,
        })
      );
    }
  };

  const fsChangeHandler = (value: number) => {
    const currentObj = grid?.getActiveObject();

    if (currentObj) {
      dispatch(
        updateItemFs({
          id: currentObj.name!,
          updatedFs: value,
        })
      );
    }
  };

  const weightChangeHandler = (value: number) => {
    const currentObj = grid?.getActiveObject();

    if (currentObj) {
      dispatch(
        updateItemWeight({
          id: currentObj.name!,
          updatedWeight: value,
        })
      );
    }
  };

  const positionChangeHandler = (value: Partial<Position>) => {
    const currentObj = grid?.getActiveObject();

    if (currentObj) {
      const startingPosition = unitsService.startingPosition(
        grid?.width!,
        grid?.height!
      );

      if (value.x !== undefined) {
        currentObj.left =
          unitsService.inchesToPixels(value.x, grid?.width!) +
          startingPosition.left;
      }

      if (value.y !== undefined) {
        currentObj.top =
          unitsService.inchesToPixels(value.y, grid?.width!) +
          startingPosition.top;
      }

      grid?.requestRenderAll();

      dispatch(
        updateItemPosition({
          id: currentObj.name!,
          updatedPosition: value,
        })
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      {selectedCargo ? (
        <>
          <div className='flex flex-column justify-between items-center h-[10%] w-full'>
            <input
              value={selectedCargo.name}
              type='text'
              placeholder='Cargo Name'
              className='border-[#808080] border-[2px] rounded-[0.25rem] hover:border-[#404040] hover:border-[2px] pl-[5px] ml-[35.5%]'
              onChange={({ target }) =>
                dispatch(
                  updateItemName({
                    id: selectedCargo.id,
                    name: target.value,
                  })
                )
              }
            />
            <button
              className='border-[#404040] text-[#404040] hover:text-[#DC3545] border-[2px] rounded-[0.25rem] hover:border-[#DC3545] hover:border-[2px] pt-[2px] pb-[2px] pr-[4px] pl-[4px] mr-[25%]'
              onClick={deleteObject}
            >
              delete
            </button>
          </div>
          <div className='h-4/5 w-full flex flex-col items-start '>
            <div className='flex flex-row justify-center w-full'>
              <ObjectViewInput
                value={selectedCargo.position.x}
                title='X'
                type='number'
                onChange={({ target }) =>
                  positionChangeHandler({ x: +target.value })
                }
              />
              <ObjectViewInput
                value={selectedCargo.width}
                title='Width'
                type='number'
                onChange={({ target }) => widthChangeHandler(+target.value)}
              />
              <ObjectViewInput
                value={selectedCargo.weight}
                title='Weight'
                type='number'
                onChange={({ target }) => weightChangeHandler(+target.value)}
              />
            </div>
            <div className='flex flex-row justify-center w-full pt-[15px]'>
              <ObjectViewInput
                value={selectedCargo.position.y}
                title='Y'
                type='number'
                onChange={({ target }) =>
                  positionChangeHandler({ y: +target.value })
                }
              />
              <ObjectViewInput
                value={selectedCargo.length}
                title='Length'
                type='number'
                onChange={({ target }) => lengthChangeHandler(+target.value)}
              />
              <ObjectViewInput
                value={selectedCargo.fs}
                title='Fuselage'
                type='number'
                onChange={({ target }) => fsChangeHandler(+target.value)}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

interface InputProps {
  value: string | number;
  title: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const ObjectViewInput = ({ value, title, type, onChange }: InputProps) => {
  return (
    <div className='flex flex-col justify-start'>
      <span className='ml-[0.4rem]'>{title}</span>
      <input
        value={value}
        type={type}
        placeholder={title}
        className='border-[#808080] border-[2px] rounded-[0.25rem] hover:border-[#404040] hover:border-[2px] pl-[5px]'
        onChange={onChange}
      />
    </div>
  );
};
