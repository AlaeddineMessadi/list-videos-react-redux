import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import { ProcessedVideo } from '../common/interfaces';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
}));

interface ListPageProps {
  list?: ProcessedVideo[];
}

// default videos value
const defaultVideos: ProcessedVideo[] = [];

/**
 *  List Page
 * @param param0 ListPageProps
 */
export const ListPage: React.FC<ListPageProps> = ({ list }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h1>List of Videos</h1>
        </Grid>
      </Grid>
    </Container>
  );
};
