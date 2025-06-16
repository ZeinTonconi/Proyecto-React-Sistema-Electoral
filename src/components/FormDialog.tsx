import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface FormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: () => void;
}

export const FormDialog = ({
  onClose,
  open,
  title,
  children,
  onSubmit,
}: FormDialogProps) => {
  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            onSubmit();
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button type="submit">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};