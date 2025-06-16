import { Container, Typography } from "@mui/material";
import CustomizedBarChart from "../components/CustomizedBarChart";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { getVotesByCandidate } from "../services/VotingService";
import { getUsers } from "../services/Auth";
import type { User } from "../interfaces/userInterface";

function VotingManagement() {
  const [data, setData] = useState<{ name: string; votes: number, color: string }[]>([]);
  const [votingStatusData, setVotingStatusData] = useState<{ name: string; votes: number, color: string }[]>([]);

  useEffect(() => {
    const loadVotes = async () => {
      try {
        const candidates = await getCandidateService();
        const votesData = [];
        for (const candidate of candidates) {
          const votes = await getVotesByCandidate(candidate.id);
          votesData.push({
            name: candidate.candidate_name,
            votes: votes.length,
            color: candidate.color_card
          });
        }
        setData(votesData);

        const users = await getUsers();
        const votedCount = users.filter((user: User) => user.hasVoted).length;
        const notVotedCount = users.length - votedCount;
        setVotingStatusData([
          { name: "Votaron", votes: votedCount, color: '#74ed86' },
          { name: "No votaron", votes: notVotedCount, color: '#f05d5d' }
        ]);

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
      <CustomizedBarChart data={data} />
      <Typography variant="h4" gutterBottom marginTop={6}>
        Estado de la votación
      </Typography>

      <CustomizedBarChart data={votingStatusData} />
    </Container>
  );
}

export default VotingManagement;