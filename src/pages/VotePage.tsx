import { Box, Button, Container, Grid } from "@mui/material";
import CandidateCard from "../components/CandidateCard";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { ConfirmActionDialog } from "../components/ConfirmActionDialog";
import { getStorage, setStorage } from "../helpers/LocalStorage";
import { useNavigate } from "react-router-dom";
import { postVote } from "../services/VotingService";

function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  const [candidates, setCandidates] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const navigate= useNavigate();

  const handleCandidateSelect = (candidateName: string) => {
    setSelectedCandidate((prev) =>
      prev === candidateName ? null : candidateName
    );
  };

  const vote = async () => {
    try {
        const user = getStorage('user');
        await postVote(user.id, selectedCandidate, user)
    } catch (error) {
        console.log("Error al emitir el voto", error)
        throw error
    }
  };

  const voteSuccess = () => {
    navigate('/login')
  }

  const getAllCandidates = async () => {
    const res = await getCandidateService();
    setCandidates(res);
  };

  const getCandidateCard = (candidate: any) => {
    const { candidate_name, candidate_image, political_party, color_card } =
      candidate;
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        {candidates.map((candidate) => getCandidateCard(candidate))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Confirmar
        </Button>
      </Box>
      <ConfirmActionDialog
        confirmAction={vote}
        handleClose={() => {
          setOpenDialog(false);
        }}
        handleCloseSuccess={voteSuccess}
        open={openDialog}
        message="Presiona el boton de confirmar para emitir tu voto. No se podra cambiar posteriormente."
      />
    </Container>
  );
}

export default VotePage;
