import {
    Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState, type ChangeEvent } from "react";

export interface Center {
  id: string;
  name: string;
  address: string;
  numberOfTable: number;
}

interface CenterListProps {
  centers: Center[];

  deleteAction: (id: string) => void;
  editAction: (center: any) => void

}

interface Column {
  id:
    | "id"
    | "name"
    | "address"
    | "numberOfTable"
    | "actions";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: Column[] = [
  { id: "id", label: "N°", minWidth: 30, align: "left" },
  { id: "name", label: "Nombre", minWidth: 120, align: "left" },
  { id: "address", label: "Dirección", minWidth: 120, align: "left" },
  { id: "numberOfTable", label: "N° de Mesas", minWidth: 40, align: "left" },
  { id: "actions", label: "Editar / Eliminar", minWidth: 20, align: "center" },
];

const CenterList = ({ centers, deleteAction, editAction }: CenterListProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "visible", marginTop: 2 }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            width: "100%",
            overflowX: "auto",
            maxWidth: { xs: 450, sm: 550, md: 600, lg: 1000, xl: 1400 },
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {centers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((centers) => (
                  <TableRow key={centers.id}>
                    <TableCell align="left">{centers.id}</TableCell>
                    <TableCell align="left">{centers.name}</TableCell>
                    <TableCell align="left">{centers.address}</TableCell>
                    <TableCell align="left">{centers.numberOfTable}</TableCell>
                    <TableCell align="center">
                      <Box
                       sx={{
                        display: 'flex',
                        gap: {xs: 0.5, sm: 1},
                        justifyContent: 'center',
                        alignContent: 'center',
                       }}>
                            <IconButton onClick={() => {editAction(centers)}}>

                          <EditIcon color="info"/>
                            </IconButton>
                            <IconButton onClick={() => {deleteAction(centers.id)}}>

                          <DeleteForeverIcon color="error" />
                            </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={centers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: 3 }}
        />
      </Paper>
    </>
  );
};

export default CenterList;
