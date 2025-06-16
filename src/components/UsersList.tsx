import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, type ChangeEvent } from "react";
import type { User } from "../interfaces/userInterface";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Photo } from "./Photo";


interface Column {
  id: "nombre" | "apellido" | "ci" | "rol" | "centroVotacion" | "voto" | "foto";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: Column[] = [
  { id: "nombre", label: "Nombre", minWidth: 120, align: "left" },
  { id: "apellido", label: "Apellido", minWidth: 120, align: "left" },
  { id: "ci", label: "C.I.", minWidth: 120, align: "left" },
  { id: "rol", label: "Rol", minWidth: 100, align: "left" },
  {
    id: "centroVotacion",
    label: "Centro de Votación",
    minWidth: 100,
    align: "left",
  },
  { id: "voto", label: "Votó", minWidth: 100, align: "left" },
  { id: "foto", label: "Ver foto", minWidth: 100, align: "left" },
];

interface UsersListProps {
  users: User[];
}

export default function UsersList({ users }: UsersListProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [selectedUserPhoto, setSelectedUserPhoto] = useState<string>("");

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    const openPhotoHandler = (userPhoto: string) => {
        setSelectedUserPhoto(userPhoto);
        setOpenPhotoModal(true);
    };
    const closePhotoHandler = () => {
        setOpenPhotoModal(false);
    };

  return (
    <>
    <Photo open={openPhotoModal} photoUrl={selectedUserPhoto} onClose={closePhotoHandler}></Photo>
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
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.ci}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
                    <TableCell align="left">{user.numberPlace}</TableCell>
                    <TableCell align="left">
                      {user.hasVoted ? "Sí" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 0.5, sm: 1 }
                        }}
                      >
                        <IconButton onClick={() => openPhotoHandler(user.userPhoto)}>
                          <CameraAltIcon color="info" />
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: 3 }}
        />
      </Paper>
    </>
  );
}
