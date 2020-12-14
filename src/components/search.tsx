import React from 'react';
import { IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
  label?: string;
  value: string;
  onChangeHandler: any;
  onClickHandler: any;
}

export const Search: React.FC<SearchProps> = ({ label, value, onChangeHandler, onClickHandler }) => {
  return (
    <>
      <TextField id="search-filter" fullWidth label={label || 'Search'} variant="outlined" value={value} onChange={onChangeHandler} />
      <IconButton aria-label="delete" onClick={onClickHandler}>
        <SearchIcon />
      </IconButton>
    </>
  );
};
