import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { VideosTable } from '../components/videos-table';

import { ProcessedVideo } from '../common/interfaces';
import { useSelector, shallowEqual } from 'react-redux';
import { AppState } from '../store/types';
import { Search } from '../components/search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    display: 'flex',
  },
}));

interface ListPageProps {}

/**
 *  List Page
 * @param param0 ListPageProps
 */
export const ListPage: React.FC<ListPageProps> = () => {
  const classes = useStyles();

  const [searchVal, setSearchVal] = useState('');
  const changeHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const val: string = event.target.value as string;

    setSearchVal(val);
  };

  const filterProcessedVideos = (videos: readonly ProcessedVideo[]) => {
    return searchVal ? videos.filter((vid) => vid.name.search(searchVal.trim()) >= 0) : videos;
  };

  const processedVideos: readonly ProcessedVideo[] = useSelector((state: AppState) => state.videos, shallowEqual);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item xs={12}>
          <h1>List of Videos</h1>
        </Grid>
        <Grid item xs={6} className={classes.search}>
          <Search
            label="Search"
            value={searchVal}
            onChangeHandler={changeHandler}
            onClickHandler={() => () => filterProcessedVideos(processedVideos)}
          />
        </Grid>
        <Grid item xs={12}>
          <VideosTable videos={filterProcessedVideos(processedVideos)} />
        </Grid>
      </Grid>
    </Container>
  );
};
