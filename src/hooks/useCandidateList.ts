import { useState, type ChangeEvent } from "react";

import type { Candidate } from "../interfaces/candidateInterface";

export const useCandidateList = () => {
const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string>("");
    const [selectedCandidateName, setSelectedCandidateName] = useState<string>("");

    const handleOpenDialog = (candidate: Candidate) => {
        setOpen(true);
        setSelectedCandidateId(candidate.id);
        setSelectedCandidateName(candidate.candidate_name);
    };

    const handleOpenUpdateDialog = (candidate: Candidate) => {
        setUpdateOpen(true);
        setSelectedCandidateId(candidate.id);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedCandidateId("");
    };

    const handleCloseUpdateDialog = () => {
        setUpdateOpen(false);
    };

    return {
        open,
        updateOpen,
        page,
        rowsPerPage,
        selectedCandidateId,
        selectedCandidateName,
        handleChangePage,
        handleChangeRowsPerPage,
        handleOpenDialog,
        handleOpenUpdateDialog,
        handleCloseDialog,
        handleCloseUpdateDialog
    };
}