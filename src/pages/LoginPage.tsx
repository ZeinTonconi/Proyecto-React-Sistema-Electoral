import {
  Container,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  Grid,
  Card,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import { CameraModal } from "../components/CameraModal";
import { SnackBarWithAlert } from "../components/SnackBarWithAlert";
import { useLogin } from "../hooks/useLogin";

function LoginPage() {
  const {
    openCameraModal,
    closeModal,
    formik,
    showAdminPass,
    openSnackBar,
    closeSnackBars,
    snackBarSucces,
    snackBarVoted,
    snackBarSuccesAdmin,
    votingTable,
    snackBarWrongTable
  } = useLogin();



  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ paddingTop: 2, justifyContent: "center", alignItems: "center" }}
        spacing={2}
        maxWidth={"35%"}
      >
        <Card sx={{ height: "100%", width: "100%", boxShadow: 3 }}>
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="h5" component="div">
              Nro de Mesa: {votingTable.noTable}
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography
                  // sx={{
                  //   fontSize: 20,
                  //   fontWeight: 'bold'
                  // }}
                  variant="h5"
                >
                  Desde:
                </Typography>
                <Typography
                  // sx={{
                  //   fontSize: 20
                  // }}
                  variant="h6"
                  color="text.secondary"
                >
                  {votingTable.start}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent sx={{ height: "100%" }}>
                <Typography
                  //  sx={{
                  //   fontSize: 20,
                  //   fontWeight: 'bold'
                  // }}
                  variant="h5"
                >
                  Hasta:
                </Typography>
                <Typography
                  // sx={{
                  //   fontSize: 20,
                  // }}

                  variant="h6"
                  color="text.secondary"
                >
                  {votingTable.end}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Card sx={{ boxShadow: 3 }}>
            <CardContent
              sx={{
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
                  helperText={
                    formik.touched.birthDate && formik.errors.birthDate
                  }
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
                {showAdminPass && (
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
                      formik.touched.adminPassword &&
                      formik.errors.adminPassword
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
          </Card>
        </Box>
      </Stack>
      <CameraModal open={openCameraModal} onClose={closeModal} />
      <SnackBarWithAlert
        open={openSnackBar}
        handleClose={closeSnackBars}
        message="Datos incorrectos. Vuelve a intentarlo mas tarde"
        severity="error"
      />
      <SnackBarWithAlert
        open={snackBarVoted}
        handleClose={closeSnackBars}
        message="Usted ya voto!!!"
        severity="info"
      />
      <SnackBarWithAlert
        open={snackBarSucces}
        handleClose={closeSnackBars}
        message="Inicio de sesión exitoso"
        severity="success"
      />
      <SnackBarWithAlert
        open={snackBarSuccesAdmin}
        handleClose={closeSnackBars}
        message="Inicio de sesión exitoso como administrador"
        severity="success"
      />
       <SnackBarWithAlert
        open={snackBarWrongTable}
        handleClose={closeSnackBars}
        message="Esta no es su mesa, vayase!"
        severity="error"
      />
    </Container>
  );
}

export default LoginPage;
