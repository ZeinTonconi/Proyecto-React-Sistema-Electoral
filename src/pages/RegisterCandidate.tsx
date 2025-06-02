import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  CardMedia,
  Card,
  Grid,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { postCandidateService } from "../services/CandidateService";
import * as Yup from "yup";

const candidateSchema = Yup.object({
  candidate_name: Yup.string()
    .min(2, "El nombre necesita al menos 2 caracteres")
    .max(50, "No más de 50 caracteres")
    .required("Nombre del candidato requerido"),

  political_party: Yup.string()
    .min(2, "El nombre del partido necesita al menos 2 caracteres")
    .max(50, "No más de 50 caracteres")
    .required("Nombre del partido requerido"),

  color_card: Yup.string()
    .matches(
      /^#([A-Fa-f0-9]{6})$/,
      "Debe ser un color HEX válido, p.ej. #a1b2c3"
    )
    .required("Color de tarjeta requerido"),
});

function RegisterCandidate() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      candidate_name: "",
      candidate_image: "/src/assets/Candidate.jpg",
      political_party: "",
      party_image: "",
      color_card: "",
    },
    validationSchema: candidateSchema,
    onSubmit: async (values) => {
      try {
        await postCandidateService(values);

        navigate("/vote-page");
      } catch (error) {
        console.error("Error registrando candidato:", error);
      }
    },
  });

  const handleFileChange =
    (field: "candidate_image" | "party_image") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (!file) return;
      formik.setFieldValue(field, `/src/assets/${file.name}`);
    };
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Registrar Nuevo Candidato
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="candidate_name"
          name="candidate_name"
          label="Nombre del Candidato"
          variant="outlined"
          value={formik.values.candidate_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.candidate_name &&
            Boolean(formik.errors.candidate_name)
          }
          helperText={
            formik.touched.candidate_name && formik.errors.candidate_name
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          id="political_party"
          name="political_party"
          label="Partido Político"
          variant="outlined"
          value={formik.values.political_party}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.political_party &&
            Boolean(formik.errors.political_party)
          }
          helperText={
            formik.touched.political_party && formik.errors.political_party
          }
          sx={{ mb: 2 }}
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
          fullWidth
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
        >
          Registrar Candidato
        </Button>
      </form>
    </Container>
  );
}

export default RegisterCandidate;
