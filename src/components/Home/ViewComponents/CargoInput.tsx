import React, { PropsWithChildren } from 'react';
import './styles.css';

export type BasicInputProps = {
  label?: string;
  labelPosition?: labelPositionEnum;
  labelSize?: number;
  labelTextPosition?: labelTextPositionEnum;
  onChange?: (data: any) => void;
};

export type InputProps = {
  placeholder?: string | number;
  value?: string | number | readonly string[];
} & BasicInputProps;

export enum labelPositionEnum {
  TOP = 'column',
  BOTTOM = 'column-reverse',
  RIGHT = 'row-reverse',
  LEFT = 'row',
}

export enum labelTextPositionEnum {
  CENTER = 'center',
  LEFT = 'flex-start',
}

export const CargoInput = ({
  children,
  label,
  labelPosition,
  labelSize,
  labelTextPosition,
}: PropsWithChildren<InputProps>) => {
  const input = children;

  return (
    <div
      className='cargo-input-holder'
      style={{ flexDirection: labelPosition }}
    >
      {label !== '' || undefined ? (
        <span
          className='input-label'
          style={{
            fontSize: `${labelSize}rem`,
            justifyContent: labelTextPosition,
          }}
        >
          {label}
        </span>
      ) : (
        <></>
      )}
      {input}
    </div>
  );
};
