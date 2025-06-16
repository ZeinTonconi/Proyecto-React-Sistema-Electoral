import { Container, Typography } from "@mui/material";
import CustomizedBarChart from "../components/CustomizedBarChart";
import { useEffect, useState } from "react";
import { getCandidateService } from "../services/CandidateService";
import { getUsers } from "../services/Auth";
import { useVoteStore } from "../store/useVoteStore";
import type { User } from "../interfaces/userInterface";

function VotingManagement() {
  const { votes, fetchVotes } = useVoteStore();
  const [data, setData] = useState<{ name: string; votes: number; color: string }[]>([]);
  const [votingStatusData, setVotingStatusData] = useState<{ name: string; votes: number; color: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchVotes();
        const candidates = await getCandidateService();
        const voteCountMap: Record<number, number> = {};
        votes.forEach((vote) => {
          voteCountMap[vote.candidate_id] = (voteCountMap[vote.candidate_id] || 0) + 1;
        });
        const chartData = candidates.map((candidate: any) => ({
          name: candidate.candidate_name,
          votes: voteCountMap[candidate.id] || 0,
          color: candidate.color_card,
        }));
        setData(chartData);
        const users = await getUsers();
        const votedCount = users.filter((user: User) => user.hasVoted).length;
        const notVotedCount = users.length - votedCount;
        setVotingStatusData([
          { name: "Votaron", votes: votedCount, color: "#74ed86" },
          { name: "No votaron", votes: notVotedCount, color: "#f05d5d" },
        ]);
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };

    loadData();
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
