import { Alert, Snackbar } from "@mui/material";

interface SnackBarWithAlertProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export const SnackBarWithAlert = ({ open, handleClose, message, severity }: SnackBarWithAlertProps) => {
  return (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity={severity}
      sx={{ width: "100%" }}
    >
      {message}
    </Alert>
  </Snackbar>);
};
