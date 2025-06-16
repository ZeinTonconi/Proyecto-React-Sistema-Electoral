import { Box, Card, CardContent, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearStorage } from "../helpers/LocalStorage";
import { useAuthStore } from "../store/authStore";
import type { User } from "../interfaces/userInterface";

export default function VoteConfirmationPage() {
  const navigate = useNavigate();

  const voteDate = new Date().toLocaleString("es-BO", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const {setUser, setToken, setIsAdmin } = useAuthStore((state) => state)
  const receiptId = Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleFinish = () => {
    clearStorage();
    setUser({} as User);
    setIsAdmin(false); 
    setToken("");
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        ¡Voto Registrado!
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Este es tu comprobante de votación.
      </Typography>
      <Card sx={{ mt: 4, p: 2, border: "1px solid #ccc" }}>
        <CardContent>
          <Typography variant="body1">Fecha y hora:</Typography>
          <Typography variant="h6" gutterBottom>{voteDate}</Typography>

          <Typography variant="body1">ID del comprobante:</Typography>
          <Typography variant="h6" gutterBottom>{receiptId}</Typography>

          <Typography variant="body2" color="text.secondary" mt={2}>
            Gracias por participar en este proceso democrático.
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button variant="contained" onClick={handleFinish}>
          Finalizar
        </Button>
      </Box>
    </Container>
  );
}
