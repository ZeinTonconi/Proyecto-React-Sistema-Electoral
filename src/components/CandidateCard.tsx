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
  political_party: string;
  color_card: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CandidateCard({
  candidate_name,
  candidate_image,
  political_party,
  color_card,
  isSelected,
  onClick,
}: CandidateCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: color_card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        marginTop: 2,
        paddingTop: 3,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") onClick();
}}
    >
      {candidate_image && (
        <CardMedia
          component="img"
          image={candidate_image}
          alt={`Foto del candidato ${candidate_name}`}
          sx={{
            borderRadius: 2,
            width: "100%",
            height: "auto",
            padding: 2,
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
      )}

      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {candidate_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {political_party}
        </Typography>

        
      </CardContent>
      <Checkbox
          checked={isSelected}
          onChange={onClick}
          onClick={(e) => e.stopPropagation()}
          sx={{ marginBottom: 5 }}
          slotProps={{ input: { "aria-label": `Seleccionar a ${candidate_name}` } }}
        />
    </Card>
  );
}
