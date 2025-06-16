import { Container, Grid } from "@mui/material";
import CandidateCard from "../components/CandidateCard";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { ConfirmActionDialog } from "../components/ConfirmActionDialog";
import { useAuthStore } from "../store/authStore";
import { useVoteStore } from "../store/useVoteStore";

function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [candidates, setCandidates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const {user} = useAuthStore((state)=>state);
  const { registerVote } = useVoteStore((state)=>state);

  const handleCandidateSelect = (candidateName: string) => {
    setSelectedCandidate(candidateName);
    setOpenDialog(true);
  };

  const handleConfirmVote = async () => {
    try {
      //const user = getStorage("user");

      const candidate: any = candidates.find(
        (c: any) => c.candidate_name === selectedCandidate
      );

      if (!candidate) {
        console.error("Candidato no encontrado");
        return;
      }

      await registerVote(user.id, candidate.id, user);
    } catch (error) {
      console.error("Error al emitir el voto", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCancelVote = () => {
    setSelectedCandidate(null);
    setOpenDialog(false);
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

      <ConfirmActionDialog
        confirmAction={handleConfirmVote}
        handleClose={handleCancelVote}
        handleCloseSuccess={() => {}}
        open={openDialog}
        message={`¿Estás seguro de votar por "${selectedCandidate}"? Esta acción no se podrá cambiar.`}
      />
    </Container>
  );
}

export default VotePage;
