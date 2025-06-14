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
import { CameraModal } from "./CameraModal";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";
import { useCitizenRegistry } from "../hooks/useCitizenRegistry";



interface RegisterUsersProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterUsers = ({ open, onClose }: RegisterUsersProps) => {
  const {openCameraModal, closeModalCamera, handleClose, formik, isPhotoTaken, places, openCamera, captureImageCamera} = useCitizenRegistry(onClose);
  return (
    <>
      <CameraModal open={openCameraModal} onClose={closeModalCamera} onCapture={captureImageCamera} />

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
