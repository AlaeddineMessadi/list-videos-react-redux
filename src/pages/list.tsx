import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { VideosTable } from '../components/videos-table';

import { ProcessedVideo } from '../common/interfaces';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../store/types';

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

  const dispatch: Dispatch<any> = useDispatch();

  const processedVideos: readonly ProcessedVideo[] = useSelector((state: AppState) => state.videos, shallowEqual);

  /**
  // Videos State
  const [videos, setVideos]: [ProcessedVideo[], (videos: ProcessedVideo[]) => void] = React.useState(defaultVideos);

  // Loading State
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);

  React.useEffect(() => {
    getVideos().then((value) => {
      setVideos(value);
      setLoading(false);
    });
  }, []);
  */

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
