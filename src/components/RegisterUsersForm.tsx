import {
  Button,
  Container,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as Yup from "yup";
import { registerUser } from "../services/Auth";
import { useFormik } from "formik";
import { CameraModal } from "./CameraModal";
import { useEffect, useState } from "react";
import { getPlaces } from "../services/Places";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";

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
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(25, "El nombre no puede tener más de 25 caracteres")
    .required("Nombre requerido"),
  lastName: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(25, "El apellido no puede tener más de 25 caracteres")
    .required("Apellido requerido"),
  place: Yup.string().required("Lugar de votación requerido"),
});

interface RegisterUsersProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterUsers = ({ open, onClose }: RegisterUsersProps) => {
  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [places, setPlaces] = useState<string[]>([]);

  const fetchPlaces = async () => {
    try {
      const response = await getPlaces();
      setPlaces(response);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const formik = useFormik({
    initialValues: {
      ci: "",
      birthDate: "",
      name: "",
      lastName: "",
      place: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const idPlace = parseInt(values.place, 10);
        const user = await registerUser(
          values.ci,
          values.birthDate,
          values.name,
          values.lastName,
          idPlace
        );
        handleClose();
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    },
  });

  const openCamera = () => setOpenCameraModal(true);

  const closeModalCamera = () => {
    setOpenCameraModal(false);
    setIsPhotoTaken(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setIsPhotoTaken(false);
    onClose();
  };

  return (
    <>
      <CameraModal open={openCameraModal} onClose={closeModalCamera} />

      <Modal open={open} onClose={() => {}} disableEscapeKeyDown>
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
            Registro de Votantes
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Carnet de Identidad"
              name="ci"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.ci}
              helperText={formik.touched.ci && formik.errors.ci}
              error={formik.touched.ci && Boolean(formik.errors.ci)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Fecha de Nacimiento"
              name="birthDate"
              type="date"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
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
            />

            <TextField
              label="Nombre"
              name="name"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Apellido"
              name="lastName"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              select
              label="Lugar de Votación"
              name="place"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.place}
              helperText={formik.touched.place && formik.errors.place}
              error={formik.touched.place && Boolean(formik.errors.place)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PlaceIcon />
                    </InputAdornment>
                  ),
                },
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 40 * 5,
                        overflowY: "auto",
                      },
                    },
                  },
                },
              }}
            >
              {places.map((place: any) => (
                <MenuItem key={place.id} value={place.id}>
                  {place.name}
                </MenuItem>
              ))}
            </TextField>

            {!isPhotoTaken ? (
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={openCamera}
              >
                Sacar Foto
              </Button>
            ) : (
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
        </Container>
      </Modal>
    </>
  );
};

export default RegisterUsers;
