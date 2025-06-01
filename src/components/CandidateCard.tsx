import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";

interface CandidateCardProps {
  candidate_name: string;
  candidate_image?: string;
  party_image?: string;
  political_party: string;
  color_card: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function ActionAreaCard({
  candidate_name,
  candidate_image,
  party_image,
  political_party,
  color_card,
  isSelected,
  onClick,
}: CandidateCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: color_card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        margin: 2,
        paddingTop: 4,
      }}
    >
      {candidate_image && (
        <CardMedia
          component="img"
          image={candidate_image}
          alt="Candidate Image"
          sx={{
            borderRadius: 15,
            alignItems: "center",
            width: "100%",
            height: "auto",
            padding: 3,
            aspectRatio: "1 / 1",
          }}
        />
      )}
      {party_image && (
        <CardMedia
          component="img"
          image={party_image}
          alt="Partido Politico"
          sx={{
            borderRadius: 15,
            alignItems: "center",
            width: "100%",
            height: "auto",
            padding: 3,
            aspectRatio: "1 / 1",
          }}
        />
      )}
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {candidate_name}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>{political_party}</Typography>

        <Checkbox
          checked={isSelected}
          onChange={onClick}
          onClick={(e) => e.stopPropagation()}
          sx={{ display: "flex", justifyContent: "center" }}
        />
      </CardContent>
    </Card>
  );
}
