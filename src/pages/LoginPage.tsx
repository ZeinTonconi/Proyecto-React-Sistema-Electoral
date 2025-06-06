import {
  Container,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { CameraModal } from "../components/CameraModal";
import { getUser } from "../services/Auth";
import { setStorage } from "../helpers/LocalStorage";

function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const closeModal = () => {
    setOpenCameraModal(false);
  };
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const formik = useFormik({
    initialValues: {
      ci: "",
      birthDate: "",
      adminPassword: "",
    },
    validationSchema: Yup.object({
      ci: Yup.string()
        .min(5, "El CI no puede tener menos de 5 dígitos")
        .max(10, "El CI no puede tener más de 10 dígitos")
        .matches(/^\d+$/, "Solo se permiten números")
        .required("CI Requerido"),
      birthDate: Yup.date()
        .required("La fecha de nacimiento es requerida")
        .max(eighteenYearsAgo, "Debes ser mayor de 18 años para votar"),
      adminPassword: Yup.string().min(
        6,
        "La contraseña debe tener al menos 6 caracteres"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const user = await getUser(values.ci, values.birthDate);
        if (user.length > 0) {
          setStorage("user", user[0]);
          if (user[0].role === "admin") {
            const admin = await getUser(values.ci, values.adminPassword);
            if (admin.length > 0) {
            setIsAdmin(true);
            setStorage("isAdmin", true);
            console.log("Usuario administrador autenticado");
            }else {console.log("Contraseña de administrador incorrecta");}
          } else {
            setOpenCameraModal(true);
            setIsAdmin(false);
            setStorage("isAdmin", false);
          }
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <CameraModal open={openCameraModal} onClose={closeModal} />
      <Box
        sx={{
          marginTop: 8,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            marginTop: 25,
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              marginY: 2,
            }}
            variant="h5"
            component="h1"
            gutterBottom
          >
            INGRESAR A LA VOTACIÓN
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
              helperText={formik.touched.birthDate && formik.errors.birthDate}
              error={
                formik.touched.birthDate && Boolean(formik.errors.birthDate)
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
            />
            {isAdmin && (
              <TextField
                id="input-adminpassword-textfield"
                label="Contraseña de Administrador"
                type="password"
                name="adminPassword"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                value={formik.values.adminPassword}
                helperText={
                  formik.touched.adminPassword && formik.errors.adminPassword
                }
                error={
                  formik.touched.adminPassword &&
                  Boolean(formik.errors.adminPassword)
                }
              />
            )}
            <Button
              sx={{
                marginTop: 2,
                width: "100%",
              }}
              variant="contained"
              type="submit"
            >
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Box>
    </Container>
  );
}

export default LoginPage;
