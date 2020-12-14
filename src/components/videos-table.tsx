import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ProcessedVideo, Video } from '../common/interfaces';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { thunkDeleteVideo } from '../store/thunks';
import { findHighestVideoFormat } from '../utils/helpers';
import { DialogElm } from './dialog';

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

  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState({} as ProcessedVideo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /**
   * remove On Click Accept in dialog
   */
  const handleAcceptAndClose = async () => {
    // persist Video
    await dispatch(thunkDeleteVideo(video));
    setOpen(false);
  };

  const removeVideoHandler = async (video: ProcessedVideo) => {
    setVideo(video);
    setOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: '40px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Video Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Highest quality Format</TableCell>
              <TableCell>Release Date</TableCell>
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
                  <TableCell>{findHighestVideoFormat(video)}</TableCell>
                  <TableCell>{video.date}</TableCell>
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
      <DialogElm open={open} handleClose={handleClose} handleAcceptAndClose={handleAcceptAndClose} />
    </>
  );
};
