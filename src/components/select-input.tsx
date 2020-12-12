import React from 'react';
import { InputLabel, Select } from '@material-ui/core';
import { Author } from '../common/interfaces';

interface SelectInputProps {
  authors: Author[];
  // handleChange?: any;
  value?: any;
  label?: string;
}

export const SelectInputElm: React.FC<SelectInputProps> = ({ authors, value, label }) => {
  const selectId: string = `${label?.toLowerCase()}-select`;

  const [author, setAuthor] = React.useState<Author>({} as Author);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const authorId: number = event.target.value as number;
    setAuthor(authors[authors.findIndex((elm) => elm.id == authorId)]);
  };

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
        {authors?.map((elm: Author) => (
          <option value={elm.id}>{elm.name}</option>
        ))}
      </Select>
    </>
  );
};
