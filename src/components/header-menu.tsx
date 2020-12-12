import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
}));

/**
 * HeaderMenu Component
 */
export const HeaderMenu: React.FC<{}> = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="secondary" elevation={0} className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link to="/videos" className={classes.link}>
            Videos
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link to="/about" className={classes.link}>
            About
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link to="/faq" className={classes.link}>
            FAQ
          </Link>
        </Typography>
        <Button variant="contained" color="primary">
          <Link to="/video/add" className={classes.link}>
            Add Video
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
