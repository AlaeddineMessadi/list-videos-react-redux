import React from 'react';
import { InputLabel, Select } from '@material-ui/core';
import { Author } from '../common/interfaces';

interface SelectInputProps {
  options: Author[];
  changeHandler?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  value?: any;
  label?: string;
  error?: boolean;
}

export const SelectInputElm: React.FC<SelectInputProps> = ({ options, value, label, changeHandler: handleChange, error }) => {
  const selectId: string = `${label?.toLowerCase()}-select`;

  return (
    <>
      <InputLabel htmlFor={selectId}>{label}</InputLabel>
      <Select
        error={error}
        native
        value={value}
        onChange={handleChange}
        label={label && label}
        inputProps={{
          name: label?.toLowerCase(),
          id: selectId,
        }}>
        <option aria-label={label} value="" />
        {options?.map((elm: Author, index: number) => (
          <option key={index} value={elm.id}>
            {elm.name}
          </option>
        ))}
      </Select>
    </>
  );
};
