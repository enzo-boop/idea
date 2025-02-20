import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  text: string;
  close: (value: boolean) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  text,
  close,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{text}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          component="label"
          color="error"
          onClick={() => close(false)}
        >
          Annulla
        </Button>
        <Button
          variant="contained"
          component="label"
          onClick={() => close(true)}
          color="primary"
        >
          Continua
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
