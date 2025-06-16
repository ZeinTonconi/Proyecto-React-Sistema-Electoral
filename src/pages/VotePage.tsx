import { Container, Grid } from "@mui/material";
import CandidateCard from "../components/CandidateCard";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { ConfirmActionDialog } from "../components/ConfirmActionDialog";
import { useVotingBallot } from "../hooks/useVotingBallot"; // ruta según organización

function VotePage() {
  const [candidates, setCandidates] = useState<any[]>([]);

  const {
    selectedCandidate,
    openDialog,
    handleCandidateSelect,
    handleConfirmVote,
    handleCancelVote,
  } = useVotingBallot(candidates);

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
