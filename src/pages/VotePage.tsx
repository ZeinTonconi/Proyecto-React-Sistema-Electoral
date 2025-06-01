import { Container, Grid } from "@mui/material";
import CandidateCard from "../components/CandidateCard";
import { useState } from "react";

function VotePage() {

    const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

    const handleCandidateSelect = (candidateName: string) => {
        setSelectedCandidate(prev => 
            prev === candidateName ? null : candidateName
        );
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={4} sx={{ marginTop: 2 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <CandidateCard
                        candidate_name="Candidate 1"
                        image="src/assets/Candidate.jpg"
                        political_party="Party 1"
                        color_card="lightblue"
                        isSelected={selectedCandidate === "Candidate 1"}
                        onClick={() => handleCandidateSelect("Candidate 1")}
                        
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <CandidateCard
                        candidate_name="Candidate 2"
                        image="src/assets/Candidate.jpg"
                        political_party="Party 2"
                        color_card="red"
                        isSelected={selectedCandidate === "Candidate 2"}
                        onClick={() => handleCandidateSelect("Candidate 2")}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                    <CandidateCard
                        candidate_name="Candidate 3"
                        image="src/assets/Candidate.jpg"
                        political_party="Party 3"
                        color_card="purple"
                        isSelected={selectedCandidate === "Candidate 3"}
                        onClick={() => handleCandidateSelect("Candidate 3")}
                    />
                </Grid>
               
            </Grid>
        </Container>
    );
}

export default VotePage;
