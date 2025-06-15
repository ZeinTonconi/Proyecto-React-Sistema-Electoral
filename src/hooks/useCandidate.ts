import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useCandidateManagementStore } from "../store/useCandidateManagementStore";
import type { Candidate } from "../interfaces/candidateInterface";

const candidateSchema = Yup.object({
    candidate_name: Yup.string()
        .min(2, "El nombre necesita al menos 2 caracteres")
        .max(50, "No más de 50 caracteres")
        .required("Nombre del candidato requerido"),

    political_party: Yup.string()
        .min(2, "El nombre del partido necesita al menos 2 caracteres")
        .max(50, "No más de 50 caracteres")
        .required("Nombre del partido requerido"),

    color_card: Yup.string()
        .matches(
            /^#([A-Fa-f0-9]{6})$/,
            "Debe ser un color HEX válido, p.ej. #a1b2c3"
        )
        .required("Color de tarjeta requerido"),
});

export const useCandidate = (candidateId: string, editCandidate: (candidate: Candidate) => void, onClose: () => void) => {

    const { fetchCandidates, candidates } = useCandidateManagementStore((state) => state);

    const formik = useFormik({
        initialValues: {
            candidate_name: "",
            political_party: "",
            color_card: "",
            candidate_image: "",
        },
        validationSchema: candidateSchema,
        onSubmit: async (values) => {
            try {
                const candidate = await editCandidate({
                    id: candidateId, ...formik.values,
                });
                handleClose();
            } catch (error) {
                console.error("Error al registrar el usuario:", error);
            }
        },
    });

    const handleClose = () => {
        formik.resetForm();
        onClose();
    };

    useEffect(() => {
        fetchCandidates();
    }, [candidates]);

    return {
        formik,
        handleClose,
        fetchCandidates,
        open
    };
}