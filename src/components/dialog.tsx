import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
    display: 'flex',
  },
}));

interface DialogProps {
  handleClose: any;
  handleAcceptAndClose: any;
  open: boolean;
}

export const DialogElm: React.FC<DialogProps> = ({ open, handleClose, handleAcceptAndClose }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure to DELETE this Video?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleAcceptAndClose} color="secondary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
