import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { ConfirmActionDialog } from "./ConfirmActionDialog";
import { useState } from "react";

export interface Table {
  id: string;
  noTable: string;
  start: string;
  end: string;
}

export interface Place {
  name: string;
  address: string;
  id: string;
  zone: string;
  votingTables: Table[];
}

export interface VotingTablesListProps {
  selectedPlace: Place | null;
  openDialog: () => void;
  tables: Table[];
  setSelectedTable: (oldTable: Table | null) => void;
  deleteSelectedTable: () => void;
}

export const VotingTablesList = ({
  selectedPlace,
  openDialog,
  tables,
  setSelectedTable,
  deleteSelectedTable,
}: VotingTablesListProps) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  return (
    <Box component={Paper} sx={{ flexGrow: 1, p: 2 }}>
      {selectedPlace ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h5" gutterBottom>
              Mesas en {selectedPlace.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                openDialog();
                setSelectedTable(null);
              }}
            >
              Agregar Mesa
            </Button>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Mesa #</TableCell>
                  <TableCell>Desde</TableCell>
                  <TableCell>Hasta</TableCell>
                  <TableCell align="center">Editar/Elimnar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.noTable}</TableCell>
                    <TableCell>{t.start}</TableCell>
                    <TableCell>{t.end}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 0.5, sm: 1 },
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <IconButton onClick={() => {
                            setSelectedTable(t)
                            openDialog()
                            }}>
                          <EditIcon color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedTable(t);
                            setOpenConfirmDialog(true);
                          }}
                        >
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Selecciona un recinto de votación para ver sus mesas.
        </Typography>
      )}
      <ConfirmActionDialog
        confirmAction={() => deleteSelectedTable()}
        handleClose={() => setOpenConfirmDialog(false)}
        handleCloseSuccess={() => setOpenConfirmDialog(false)}
        message="Seguro que quieres eliminar la mesa?"
        open={openConfirmDialog}
      />
    </Box>
  );
};
