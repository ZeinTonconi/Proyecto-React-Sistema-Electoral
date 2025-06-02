import { Box, Button, Container, Grid } from "@mui/material";
import CandidateCard from "../components/CandidateCard";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { ConfirmActionDialog } from "../components/ConfirmActionDialog";
import { getStorage } from "../helpers/LocalStorage";
import { useNavigate } from "react-router-dom";
import { postVote } from "../services/VotingService";

function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [candidates, setCandidates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleCandidateSelect = (candidateName: string) => {
    setSelectedCandidate((prev) => (prev === candidateName ? null : candidateName));
  };

  const vote = async () => {
    try {
      const user = getStorage("user");
      const candidate: any = candidates.find(
        (c: any) => c.candidate_name === selectedCandidate
      );

      if (!candidate) {
        console.error("Candidato no encontrado");
        return;
      }

      await postVote(user.id, candidate.id, user);
    } catch (error) {
      console.error("Error al emitir el voto", error);
      throw new Error("Error al emitir el voto");
    }
  };

  const voteSuccess = () => {
    const isAdmin = getStorage("isAdmin");
    if (isAdmin) 
      navigate('/dashboard');
    else
    navigate("/login");
  };

  const getAllCandidates = async () => {
    const res = await getCandidateService();
    setCandidates(res);
  };

  const getCandidateCard = (candidate: any) => {
    const { candidate_name, candidate_image, political_party, color_card } = candidate;
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={candidate_name}>
        <CandidateCard
          candidate_name={candidate_name}
          candidate_image={candidate_image}
          political_party={political_party}
          color_card={color_card}
          isSelected={selectedCandidate === candidate_name}
          onClick={() => handleCandidateSelect(candidate_name)}
        />
      </Grid>
    );
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {candidates.map((candidate) => getCandidateCard(candidate))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }} alignItems="stretch">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            marginTop: 2,
            "&:hover": {
              backgroundColor: "#115293",
              transform: "scale(1.05)",
              transition: "all 0.2s ease-in-out",
            },
          }}
          onClick={() => setOpenDialog(true)}
        >
          Confirmar Voto
        </Button>
      </Box>
      <ConfirmActionDialog
        confirmAction={vote}
        handleClose={() => setOpenDialog(false)}
        handleCloseSuccess={voteSuccess}
        open={openDialog}
        message="Presiona el botón de confirmar para emitir tu voto. No se podrá cambiar posteriormente."
      />
    </Container>
  );
}

export default VotePage;