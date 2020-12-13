import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ProcessedVideo } from '../common/interfaces';
import { Link } from 'react-router-dom';
import { removeVideo } from '../services/videos';

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
  videos: ProcessedVideo[];
}

export const VideosTable: React.FC<VideosTableProps> = ({ videos }) => {
  const classes = useStyles();

  /**
   * On form submit Handler
   */
  const removeVideoHandler = async (id: number, authorName: string) => {
    let result = await removeVideo(id, authorName);
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
          {videos.map((video) => (
            <TableRow key={video.id}>
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
                <Button
                  size="small"
                  color="secondary"
                  className={classes.margin}
                  onClick={() => removeVideoHandler(video.id, video.author)}>
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
