import React from 'react';
import { Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import { MultipleSelector } from '../components/multiple-selector';
import { Author } from '../common/interfaces';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));

interface SelectInputProps {
  authors: Author[];
  // handleChange?: any;
  value?: any;
  label?: string;
}

export const SelectInputElm: React.FC<SelectInputProps> = ({ authors, value, label }) => {
  const classes = useStyles();
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
