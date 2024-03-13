import React from 'react';
import { CargoInput, InputProps } from './CargoInput';

type Props = {
  minValue?: number | string;
  maxValue?: number | string;
} & InputProps;

export const CargoInputNumber = ({
  minValue,
  maxValue,
  placeholder,
  value,
  label,
  labelPosition,
  labelSize,
  labelTextPosition,
  onChange,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(+event.target.value);
    }
  };

  return (
    <CargoInput
      onChange={onChange}
      label={label}
      labelPosition={labelPosition}
      labelSize={labelSize}
      labelTextPosition={labelTextPosition}
    >
      <input
        className='cargo-input'
        type='number'
        placeholder={`${placeholder}`}
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleChange}
      />
    </CargoInput>
  );
};
