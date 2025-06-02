import { Avatar, Card, Typography, Divider, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

interface UserCardProps {
  labelAndData?: { label: string; data: string }[];
  addPhoto: boolean;
}

const UserCard = ({ labelAndData, addPhoto }: UserCardProps) => {
  const initials =
    (labelAndData?.[0]?.data?.charAt(0) || "") +
    (labelAndData?.[1]?.data?.charAt(0) || "");

  return (
    <Card
      sx={{
        width: 600,
        display: "flex",
        alignItems: "center",
        padding: 3,
        borderRadius: 4,
        boxShadow: 6,
        backgroundColor: "#ffffff",
        border: "1.5px solid #ddd",
        margin: "auto",
        mt: 5,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {addPhoto && (
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 120,
            height: 120,
            fontSize: 48,
            mr: 4,
            flexShrink: 0,
            boxShadow: "0 0 8px rgba(0,0,0,0.15)",
          }}
        >
          {initials}
        </Avatar>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 1 }}
        >
          Información del Usuario
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "#bbb" }} />

        {labelAndData?.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1.2,
              fontSize: "1.1rem",
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight={600}
              sx={{ minWidth: "180px" }}
            >
              {item.label}:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {item.data}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default UserCard;
