import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

interface BaseLayoutProps {
  page: JSX.Element;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ page }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container></Container>
    </div>
  );
};
