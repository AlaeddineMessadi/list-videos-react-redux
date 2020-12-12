import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
}));

type TParams = { id: number };

interface EditPageProps {
  match?: TParams;
}

export const EditPage: React.FC<EditPageProps> = ({ match }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <h1>Edit Video with ID</h1>
    </Container>
  );
};
