import React from 'react';
import { Container, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    display: 'flex',
  },
}));

interface FormControlProps {
  children?: JSX.Element | JSX.Element[];
}

export const FormControlElm: React.FC<FormControlProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      {children}
    </FormControl>
  );
};
