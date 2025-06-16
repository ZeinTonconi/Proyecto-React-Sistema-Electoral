import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { registerPlace, updatePlace } from "../services/Places";
import { Update } from "@mui/icons-material";
import { votingCentersStore } from "../store/votingCentersStore";
import { useEffect } from "react";
const centerSchema = Yup.object({
  name: Yup.string()
    .min(2, "El nombre del centro debe tener al menos 2 caracteres")
    .max(50, "El nombre del centro no puede tener más de 50 caracteres")
    .required("Nombre del centro requerido"),
  address: Yup.string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(100, "La dirección no puede tener más de 100 caracteres")
    .required("Dirección requerida"),
  zone: Yup.string().required("La zona es requerida"),
});

interface CenterRegisterProps {
  open: boolean;
  onClose: () => void;
  center: any;
}

const CenterRegisterForm = ({ open, onClose, center }: CenterRegisterProps) => {
  const isUpdate = center != null;

  const formik = useFormik({
    initialValues: {
      name: isUpdate ? center.name : "",
      address: isUpdate ? center.address : "",
      zone: isUpdate ? center.zone : "",
    },
    validationSchema: centerSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      try {
        if (isUpdate) {
         await updatePlace(center.id, values);
        }
        else {
          await registerPlace(values.name, values.address, values.zone);
        }
        loadZones()
        onClose();
      } catch (error) {
        console.error("Error registrando el centro:", error);
      }
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { zones, loadZones } = votingCentersStore();

  useEffect(() => {
    if (zones.length === 0)
       loadZones();
  }, []);

  return (
    <>
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
            Registro de Centro de Votacion
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Nombre del Centro"
              name="name"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddHomeIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Dirección"
              name="address"
              type="text"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.address}
              helperText={formik.touched.address && formik.errors.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddLocationIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <InputLabel sx={{ pt: 1 }}>Zona</InputLabel>
            <Select
              name="zone"
              value={formik.values.zone}
              label="zones"
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
              error={formik.touched.zone && Boolean(formik.errors.zone)}
            >
              {zones.map((zone) => (
                <MenuItem key={zone.id} value={zone.id}>
                  {zone.zone}
                </MenuItem>
              ))}
            </Select>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              {isUpdate ? "Guardar" : "Registrar Centro"}
            </Button>
          </form>
        </Container>
      </Modal>
    </>
  );
};

export default CenterRegisterForm;
