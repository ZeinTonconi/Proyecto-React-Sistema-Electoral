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
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import { CameraModal } from "../components/CameraModal";
import { getAdmin, getUser } from "../services/Auth";
import { setStorage } from "../helpers/LocalStorage";
import { SnackBarWithAlert } from "../components/SnackBarWithAlert";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const [openCameraModal, setOpenCameraModal] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarVoted, setSnackBarVoted] = useState(false);
  const [snackBarSucces, setSnackBarSucces] = useState(false);
  const [snackBarSuccesAdmin, setSnackBarSuccesAdmin] = useState(false);

  const {setUser, setToken, setIsAdmin, isAdmin } = useAuthStore((state) => state)

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const closeModal = () => {
    setOpenCameraModal(false);
    goToDashboard()
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
      adminPassword: isAdmin
        ? Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida")
        : Yup.string()
    }),
    onSubmit: async (values) => {    
      try {
        const user = await getUser(values.ci, values.birthDate);
        if (user.length > 0) {
          if (user[0].role === "admin") {
            if (isAdmin) {
              setSnackBarSuccesAdmin(true);
              const admin = await getAdmin(values.ci, values.adminPassword);
              if (admin.length > 0) {
                setStorage("user", admin[0]);
                setStorage("token", admin[0].token);
                setStorage("isAdmin", true);
                setUser(admin[0]);
                setToken(admin[0].token);
                setOpenCameraModal(true)
              } else {
                setOpenSnackBar(true);
              }
            }
            setIsAdmin(true);
          } else {
              setStorage("user", user[0]);
              setStorage("token", user[0].token);
              setUser(user[0]);
              setToken(user[0].token);
            if (user[0].hasVoted)
              setSnackBarVoted(true)
            else {
              setSnackBarSucces(true);
              setOpenCameraModal(true);
              setIsAdmin(false);
              setStorage("isAdmin", false);
            }
          }
        } else {
          setOpenSnackBar(true);
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
        setOpenSnackBar(true)
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <CameraModal open={openCameraModal} onClose={closeModal} />
      <Box
        sx={{
          marginY: 8,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            marginTop: "35%",
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
              sx={{ marginY: 1 }}
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
              sx={{ marginY: 1 }}
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  marginY: 1,
                }}
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
      <SnackBarWithAlert
        open={openSnackBar}
        handleClose={() => {
          setOpenSnackBar(false);
        }}
        message="Datos incorrectos. Vuelve a intentarlo mas tarde"
        severity="error"
      />
      <SnackBarWithAlert
        open={snackBarVoted}
        handleClose={() => {
          setSnackBarVoted(false)
        }}
        message="Usted ya voto!!!"
        severity="info"
      />
      <SnackBarWithAlert
        open={snackBarSucces}
        handleClose={() => {
          setSnackBarSucces(false);
        }}
        message="Inicio de sesión exitoso"
        severity="success"
      />
      <SnackBarWithAlert
        open={snackBarSuccesAdmin}
        handleClose={() => {
          setSnackBarSuccesAdmin(false);
        }}
        message="Inicio de sesión exitoso como administrador"
        severity="success"
      />
    </Container>
  );
}

export default LoginPage;
