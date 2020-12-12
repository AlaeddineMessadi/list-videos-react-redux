import React from 'react';
import { InputLabel, Select } from '@material-ui/core';
import { Author } from '../common/interfaces';

interface SelectInputProps {
  options: Author[];
  changeHandler?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  value?: any;
  label?: string;
}

export const SelectInputElm: React.FC<SelectInputProps> = ({ options, value, label, changeHandler: handleChange }) => {
  const selectId: string = `${label?.toLowerCase()}-select`;

  return (
    <>
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={handleChange}
        label={label}
        inputProps={{
          name: label?.toLowerCase(),
          id: selectId,
        }}>
        {options?.map((elm: Author) => (
          <option value={elm.id}>{elm.name}</option>
        ))}
      </Select>
    </>
  );
};
