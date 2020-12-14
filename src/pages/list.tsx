import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { VideosTable } from '../components/videos-table';

import { ProcessedVideo } from '../common/interfaces';
import { useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../store/types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
}));

interface ListPageProps {}

/**
 *  List Page
 * @param param0 ListPageProps
 */
export const ListPage: React.FC<ListPageProps> = () => {
  const classes = useStyles();

  const processedVideos: readonly ProcessedVideo[] = useSelector((state: AppState) => state.videos, shallowEqual);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h1>List of Videos</h1>
        </Grid>
        <Grid item xs={12}>
          <VideosTable videos={processedVideos} />
        </Grid>
      </Grid>
    </Container>
  );
};
