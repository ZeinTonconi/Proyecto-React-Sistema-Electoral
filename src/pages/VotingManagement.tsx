import { Container, Typography } from "@mui/material";
import CustomizedBarChart from "../components/CustomizedBarChart";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { getVotesByCandidate } from "../services/VotingService";

function VotingManagement() {
  const [data, setData] = useState<{ name: string; votes: number, color: string }[]>([]);
    useEffect(() => {
    const loadVotes = async () => {
      try {
        const candidates = await getCandidateService();

        const votesData = await Promise.all(
          candidates.map(async (candidate: any) => {
            const votes = await getVotesByCandidate(candidate.id);
            return {
              name: candidate.candidate_name,
              votes: votes.length,
              color: candidate.color_card
            };
          })
        );
        setData(votesData);        
      } catch (error) {
        console.error('Error loading chart data', error);
      }
    };
    loadVotes();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resultados de la votación
      </Typography>
      <CustomizedBarChart data={data}/>
    </Container>
  );
}

export default VotingManagement;