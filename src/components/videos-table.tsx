import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ProcessedVideo } from '../common/interfaces';
import { Link } from 'react-router-dom';
import { removeVideo } from '../services/videos';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { thunkDeleteVideo } from '../store/thunks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface VideosTableProps {
  videos: readonly ProcessedVideo[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();

  /**
   * On form submit Handler
   */
  const removeVideoHandler = async (video: ProcessedVideo) => {
    // persist Video
    await dispatch(thunkDeleteVideo(video));
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Video Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Categories</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {videos &&
            videos.map((video, index) => (
              <TableRow key={`${video.id}-${index}`}>
                <TableCell component="th" scope="row">
                  {video.name}
                </TableCell>
                <TableCell>{video.author}</TableCell>
                <TableCell>{video.categories.join(', ')}</TableCell>
                <TableCell>
                  <Link to={`/video/${video.id}`}>
                    <Button size="small" color="primary" className={classes.margin}>
                      Edit
                    </Button>
                  </Link>
                  <Button size="small" color="secondary" className={classes.margin} onClick={() => removeVideoHandler(video)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
