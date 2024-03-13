import React from 'react';
import { CargoInput, InputProps } from './CargoInput';

type Props = {} & InputProps;

export const CargoInputText = ({
  placeholder,
  value,
  label,
  onChange,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <CargoInput label={label} onChange={onChange}>
      <input
        className='cargo-input'
        type='text'
        placeholder={`${placeholder}`}
        value={value}
        onChange={handleChange}
      />
    </CargoInput>
  );
};
