import { Avatar, Modal, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PhotoProps {
  open: boolean;
  photoUrl?: string;
  onClose: () => void;
}

export const Photo = ({ open, photoUrl, onClose }: PhotoProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          borderRadius: 2,
          p: 3,
          boxShadow: 24,
          width: 400,
          textAlign: "center",
        }}
      >
        {/* Botón de cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Foto del Usuario
        </Typography>
        <Avatar
          src={photoUrl}
          sx={{
            width: 150,
            height: 150,
            fontSize: 48,
            margin: "0 auto",
            boxShadow: "0 0 8px rgba(0,0,0,0.15)",
          }}
        />
      </Box>
    </Modal>
  );
};
