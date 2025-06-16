import { Container, Typography  } from "@mui/material";

import CandidatesList from "../components/CandidateList";
import { useCandidateManagementStore } from "../store/useCandidateManagementStore";

function CandidateManagement() {

  const {deleteCandidate, editCandidate, candidates} = useCandidateManagementStore((state) => state);

  return (
    <Container sx={{ml:0, mr:0}}>
      <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
        Candidatos
      </Typography>
      <CandidatesList 
        candidates={candidates} 
        deleteCandidate={deleteCandidate} 
        editCandidate={editCandidate}
      />
    </Container>
  );
}

export default CandidateManagement;
