import {
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  IconButton,
  Grid,
  Box,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import type { Candidate } from "../interfaces/candidateInterface";
import { useCandidate } from "../hooks/useCandidate";

interface UpdateCandidateProps {
  open: boolean;
  onClose: () => void;
  editCandidate: (candidate: Candidate) => void;
  candidateId: string;
}

export const UpdateCandidate = ({ open, onClose, editCandidate, candidateId }: UpdateCandidateProps) => {

 const { formik, handleClose } = useCandidate(candidateId, editCandidate, onClose);

  const handleFileChange =
    (field: "candidate_image" | "party_image") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (!file) return;
        formik.setFieldValue(field, `/src/assets/${file.name}`);
      };

  return (
    <>
      <Modal open={open} onClose={() => { }} disableEscapeKeyDown>
        <Container
          maxWidth="xs"
          sx={{
            marginTop: 8,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            position: "relative",
            padding: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
          >
            Actualizar Candidato
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Nombre del Candidato"
              name="candidate_name"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.candidate_name}
              helperText={formik.touched.candidate_name && formik.errors.candidate_name}
              error={formik.touched.candidate_name && Boolean(formik.errors.candidate_name)}
            />

            <TextField
              label="Partido Político"
              name="political_party"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.political_party}
              helperText={formik.touched.political_party && formik.errors.political_party}
              error={
                formik.touched.political_party && Boolean(formik.errors.political_party)
              }
            />

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>Color de la Tarjeta</Typography>
              <input
                type="color"
                id="color_card"
                name="color_card"
                value={formik.values.color_card}
                onChange={formik.handleChange}
                style={{
                  width: "3rem",
                  height: "3rem",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>Foto del Candidato</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid size={6}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                  >
                    {formik.values.candidate_image
                      ? "Cambiar Imagen"
                      : "Subir Imagen"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange("candidate_image")}
                    />
                  </Button>
                </Grid>
                <Grid size={6}>
                  {formik.values.candidate_image && (
                    <CardMedia
                      component="img"
                      image={formik.values.candidate_image}
                      alt={`Vista previa del candidato`}
                      sx={{
                        borderRadius: 2,
                        width: "auto",
                        height: "100px",
                        mt: 1,
                        boxShadow: 1,
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Actualizar Candidato
            </Button>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default UpdateCandidate;
