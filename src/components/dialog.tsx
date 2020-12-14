import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface DialogProps {
  handleClose: any;
  handleAcceptAndClose: any;
  open: boolean;
  message: string;
  title: string;
}

export const DialogElm: React.FC<DialogProps> = ({ open, handleClose, handleAcceptAndClose, message, title }) => {
  return (
    <div>
      <Dialog open={open} onClose={() => handleClose()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
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
