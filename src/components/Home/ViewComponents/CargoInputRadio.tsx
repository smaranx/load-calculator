import React from 'react';
import { BasicInputProps, CargoInput } from './CargoInput';

type Props = {} & BasicInputProps;

export const CargoInputRadio = ({ label, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <CargoInput label={label}>
      <input
        type='checkbox'
        className='cargo-checkbox'
        onChange={handleChange}
      />
    </CargoInput>
  );
};
