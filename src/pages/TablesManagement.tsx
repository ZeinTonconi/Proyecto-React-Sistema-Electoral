import { Box, Typography, TextField } from "@mui/material";

import { FormDialog } from "../components/FormDialog";
import { VotingTablesList } from "../components/VotingTablesList";
import { ZonesAndPlacesTreeView } from "../components/ZonesAndPlacesTreeView";
import { usePollingManagement } from "../hooks/usePollingManagement";

export default function TreeViewManagement() {
  const {
    selectedPlace,
    openDialog,
    setOpenDialog,
    formik,
    zones,
    handlePlaceSelect,
    tables,
    setFormSelectedTable,
    deleteSelectedTable,
  } = usePollingManagement();

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="100%"
      overflow="auto"
    >
      <FormDialog
        title={selectedPlace ? "Edtiar Mesas" : "Crear Mesa"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={formik.handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            px: 1,
            width: { xs: "100%", sm: "400px" },
          }}
        >
          <TextField
            label="Empieza en: "
            id="start"
            value={formik.values.start}
            onChange={formik.handleChange}
            error={formik.touched.start && Boolean(formik.errors.start)}
            helperText={formik.touched.start && formik.errors.start}
          />
          <TextField
            label="Termina en: "
            id="end"
            value={formik.values.end}
            onChange={formik.handleChange}
            error={formik.touched.end && Boolean(formik.errors.end)}
            helperText={formik.touched.end && formik.errors.end}
          />
          {(formik.errors as any)["start-greater-than-end"] && (
            <Typography color="error" variant="subtitle1">
              {(formik.errors as any)["start-greater-than-end"]}
            </Typography>
          )}
        </Box>
      </FormDialog>

      <ZonesAndPlacesTreeView
        zones={zones}
        handlePlaceSelect={handlePlaceSelect}
      />

      <VotingTablesList
        openDialog={() => setOpenDialog(true)}
        selectedPlace={selectedPlace}
        tables={tables}
        setSelectedTable={setFormSelectedTable}
        deleteSelectedTable={deleteSelectedTable}
      />
    </Box>
  );
}
