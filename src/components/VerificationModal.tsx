import { Modal, Box, CircularProgress, Typography } from "@mui/material";
interface VerificationModalProps {
  open: boolean;
}
export const VerificationModal = ({open}: VerificationModalProps) => {
    
  return(
  <Modal
    open={open}
    aria-labelledby="verifying-modal"
    aria-describedby="verifying-process"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        textAlign: "center",
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Verificando...</Typography>
    </Box>
  </Modal>
  )
};
