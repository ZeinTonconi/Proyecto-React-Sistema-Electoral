import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as Yup from "yup";
import { registerUser } from "../services/Auth";
import { useFormik } from "formik";
import { CameraModal } from "./CameraModal";
import { useState } from "react";

const userSchema = Yup.object({
  ci: Yup.string()
    .min(5, "El CI no puede tener menos de 5 dígitos")
    .max(10, "El CI no puede tener más de 10 dígitos")
    .matches(/^\d+$/, "Solo se permiten números")
    .required("CI Requerido"),
  birthDate: Yup.date()
    .required("La fecha de nacimiento es requerida")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "Debes ser mayor de 18 años para votar"
    ),
});

const RegisterUsers = () => {
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);

  const openCamera = () => setOpenCameraModal(true);
  const closeModal = () => {
    setOpenCameraModal(false);
    setIsPhotoTaken(true);
  };

  const formik = useFormik({
    initialValues: {
      ci: "",
      birthDate: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const user = await registerUser(values.ci, values.birthDate);
        console.log("Usuario registrado:", user);
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    },
  });

  return (
    <>
      <Container maxWidth="xs" sx={{ marginTop: 4 }}>
        <CameraModal open={openCameraModal} onClose={closeModal} />
        <Box
          sx={{
            textAlign: "center",
            marginBottom: 4,
            border: "1px solid #ccc",
            padding: 4,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
          >
            Registro de Votantes
          </Typography>

          

          
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="input-ci-textfield"
                label="Carnet de Identidad"
                type="text"
                name="ci"
                helperText={formik.touched.ci && formik.errors.ci}
                error={formik.touched.ci && Boolean(formik.errors.ci)}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.ci}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
              <TextField
                id="input-birthDate-textfield"
                label="Fecha de Nacimiento"
                type="date"
                name="birthDate"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.birthDate}
                helperText={
                  formik.touched.birthDate && formik.errors.birthDate
                }
                error={
                  formik.touched.birthDate &&
                  Boolean(formik.errors.birthDate)
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                sx={{ mt: 2 }}
              />

            {!isPhotoTaken && (
            <Button
              variant="contained"
              onClick={openCamera}
              fullWidth
              sx={{ mt: 2 }}
            >
              Sacar Foto
            </Button>
          )}
            {isPhotoTaken && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Registrar Votante
              </Button>
            )}
            </form>
          
        </Box>
      </Container>
    </>
  );
};

export default RegisterUsers;
