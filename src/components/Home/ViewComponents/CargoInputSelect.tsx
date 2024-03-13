import React from 'react';
import { BasicInputProps, CargoInput } from './CargoInput';

type Props = {
  options: string[] | number[];
  defaultOption?: string | number;
} & BasicInputProps;

export const CargoInputSelect = ({ options, label, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <CargoInput label={label}>
      <select className='cargo-input' onChange={handleChange}>
        {options.map((option) => {
          return <option key={option}>{option}</option>;
        })}
      </select>
    </CargoInput>
  );
};
