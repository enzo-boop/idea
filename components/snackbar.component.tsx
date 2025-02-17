import { GetToastContext } from "@/app/contexts/toast.context";
import { Close } from "@mui/icons-material";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { useEffect } from "react";
import { render } from "react-dom";

const IdeaSnackbar: React.FC = () => {
  const { settings, setSettings } = GetToastContext();
  return (
    <Snackbar
      open={settings?.open}
      autoHideDuration={settings?.autoHideDuration}
      anchorOrigin={
        settings?.anchorOrigin ?? { vertical: "bottom", horizontal: "right" }
      }
    >
      <SnackbarContent
        message={settings?.message}
        action={
          <IconButton onClick={() => setSettings({ open: false })}>
            <Close color="primary" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default IdeaSnackbar;
