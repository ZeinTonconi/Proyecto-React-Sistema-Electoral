import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Container, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { registerPlace, updatePlace } from "../services/Places";
import { Update } from "@mui/icons-material";
const centerSchema = Yup.object(
    {
        name: Yup.string()
            .min(2, "El nombre del centro debe tener al menos 2 caracteres")
            .max(50, "El nombre del centro no puede tener más de 50 caracteres")
            .required("Nombre del centro requerido"),
        address: Yup.string()
            .min(5, "La dirección debe tener al menos 5 caracteres")
            .max(100, "La dirección no puede tener más de 100 caracteres")
            .required("Dirección requerida"),
        numberOfTable: Yup.number()
            .min(1, "El número de mesas debe ser al menos 1")
            .max(26, "El número de mesas no puede ser más de 26")
            .required("Número de mesas requerido"),
    }
)

interface CenterRegisterProps {
  open: boolean;
  onClose: () => void;
  center: any
}

const CenterRegisterForm = ({open,onClose, center}:CenterRegisterProps) => {
    const isUpdate = center != null

    const formik = useFormik({
        initialValues: {
            name: isUpdate? center.name : "",
            address: isUpdate? center.address: "",
            numberOfTable: isUpdate? center.numberOfTable: "",
        },
        validationSchema: centerSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const numberOfTable = parseInt(values.numberOfTable, 10);
                if(isUpdate)
                  await updatePlace(center.id, values)
                else
                  await registerPlace(values.name, values.address, numberOfTable);
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
            Registro de Votantes
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
              error={
                formik.touched.address && Boolean(formik.errors.address)
              }
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
            <TextField
              label="Número de Mesas"
                name="numberOfTable"
                type="number"
              fullWidth
              variant="standard"
              sx={{ mt: 2 }}
              onChange={formik.handleChange}
              value={formik.values.numberOfTable}
              helperText={formik.touched.numberOfTable && formik.errors.numberOfTable}
              error={formik.touched.numberOfTable && Boolean(formik.errors.numberOfTable)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TableRestaurantIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                {isUpdate? "Guardar": "Registrar Centro"}
              </Button>
          </form>
        </Container>
      </Modal>
        </>
    );
}

export default CenterRegisterForm;