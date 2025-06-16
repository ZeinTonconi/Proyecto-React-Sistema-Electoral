import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";

interface ConfirmActionDialogProps {
  open: boolean;
  handleClose: () => void;
  confirmAction: () => void;
  handleCloseSuccess: () => void;
  message: string;
}

export const ConfirmActionDialog = ({
  open,
  handleClose,
  confirmAction,
  handleCloseSuccess,
  message,
}: ConfirmActionDialogProps) => {
  const [showError, setShowError] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const doAction = async () => {
    try {
      await confirmAction();
    } catch (error) {
      setShowError(true);
      return
    }
    
      setShowSuccess(true);
  };

  const closeDialog = () => {
    setShowSuccess(false);
    setShowError(false);

    handleClose();
  };
  const closeDialogSuccess = () => {
    
    setShowSuccess(false);
    setShowError(false);

    handleCloseSuccess();
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {!showError && !showSuccess && (
          <>
            <DialogTitle id="alert-dialog-title">¿Estás seguro?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="error">
                Cancelar
              </Button>
              <Button onClick={doAction} autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </>
        )}
        {showError && (
          <>
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
                flexDirection: "column",
              }}
            >
              <DangerousIcon
                color="error"
                sx={{
                  fontSize: 100,
                }}
              />
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: 20 }}
              >
                Ocurrio un error al momento de realizar la accion por favor
                intente de nuevo
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} autoFocus>
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
        {showSuccess && (
          <>
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 2,
                flexDirection: "column",
              }}
            >
              <CheckCircleOutlineIcon
                color="success"
                sx={{
                  fontSize: 100,
                }}
              />
              <DialogContentText
                id="alert-dialog-description"
                sx={{ fontSize: 20 }}
              >
                La operacion se realizo de forma correcta
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialogSuccess} autoFocus>
                Cerrar
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};
