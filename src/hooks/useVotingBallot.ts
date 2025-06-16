import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useVoteStore } from "../store/useVoteStore";

export const useVotingBallot = (candidates: any[]) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { user } = useAuthStore((state) => state);
  const { registerVote } = useVoteStore((state) => state);

  const handleCandidateSelect = (candidateName: string) => {
    setSelectedCandidate(candidateName);
    setOpenDialog(true);
  };

  const handleConfirmVote = async () => {
    try {
      const candidate = candidates.find(
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

  return {
    selectedCandidate,
    openDialog,
    handleCandidateSelect,
    handleConfirmVote,
    handleCancelVote,
  };
};
