import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { ModeEdit } from '@mui/icons-material';

import type { Candidate } from './../interfaces/candidateInterface';
import { UpdateCandidate } from './UpdateCandidateForm';
import { useCandidateList } from '../hooks/useCandidateList';

interface Column {
    id: 'candidate_name' | 'political_party' | 'manage';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
    { id: 'candidate_name', label: 'Nombre', minWidth: 150, align: 'left' },
    { id: 'political_party', label: 'Partido Político', minWidth: 120, align: 'left' },
    { id: 'manage', label: 'Gestionar', minWidth: 50, align: 'left' },
];

interface CandidatesListProps {
    candidates: Candidate[];
    deleteCandidate: (candidateId: string) => void;
    editCandidate: (candidate: Candidate) => void;
}

export default function CandidatesList({ candidates, deleteCandidate, editCandidate }: CandidatesListProps) {

    const { page, rowsPerPage, open, updateOpen, selectedCandidateId, selectedCandidateName,
        handleChangePage, handleChangeRowsPerPage, handleOpenDialog, 
        handleOpenUpdateDialog, handleCloseDialog, handleCloseUpdateDialog } = useCandidateList();

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'visible', marginTop: 2 }}>
                <TableContainer sx={{ maxHeight: 440, width: '100%', overflowX: 'auto', maxWidth: { xs: 450, sm: 550, md: 600, lg: 1000, xl: 1400 }, paddingX: 4, paddingY: 2}}>
                    <Table stickyHeader aria-label="sticky table"
                    >
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
                            {candidates.length > 0 ? (candidates
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((candidate) => (
                                    <TableRow key={candidate.id}>
                                        <TableCell align="left">{candidate.candidate_name}</TableCell>
                                        <TableCell align="left">{candidate.political_party}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={(event) => {
                                                event.stopPropagation();
                                                handleOpenUpdateDialog(candidate);
                                            }}>
                                                <ModeEdit />
                                            </Button>
                                            <Button onClick={(event) => {
                                                handleOpenDialog(candidate);
                                                event.stopPropagation();
                                            }}>
                                                <PersonRemoveIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography>No hay candidatos</Typography>
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={candidates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: 3 }}
                />
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"¿Está seguro de eliminar al candidato " + selectedCandidateName + "?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Esta acción no se puede deshacer. ¿Está seguro de que desea continuar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='inherit' autoFocus onClick={handleCloseDialog}>
                            Cancelar
                        </Button>
                        <Button
                            color='inherit'
                            sx={{ backgroundColor: "red" }}
                            onClick={() => {
                                deleteCandidate(selectedCandidateId);
                                handleCloseDialog();
                            }} autoFocus>
                            Aceptar
                        </Button>
                    </DialogActions>
                </Dialog>
                <UpdateCandidate
                    open={updateOpen}
                    onClose={handleCloseUpdateDialog}
                    candidateId={selectedCandidateId}
                    editCandidate={editCandidate}
                />
            </Paper >
        </>
    );
}
