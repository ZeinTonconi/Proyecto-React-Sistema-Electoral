import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAdmin, getUser } from "../services/Auth";
import { useAuth } from "../contexts/AuthContext";
import type { Table } from "../components/VotingTablesList";
import { getTableService } from "../services/Places";

export const useLogin = () => {
  const [openCameraModal, setOpenCameraModal] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarVoted, setSnackBarVoted] = useState(false);
  const [snackBarSucces, setSnackBarSucces] = useState(false);
  const [snackBarSuccesAdmin, setSnackBarSuccesAdmin] = useState(false);
  const [showAdminPass, setShowAdminPass] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { login, logout } = useAuth();
  const { setUser, setToken } = useAuthStore(
    (state) => state
  );

  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const closeModal = () => {
    login(isAdmin);
    setOpenCameraModal(false);
    goToDashboard();
  };

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const isAtLeast65YearsOld = (dateString: string | Date): boolean => {
    const birthDate = new Date(dateString);
    const today = new Date();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 65);

    return birthDate <= eighteenYearsAgo;
  };
  const [snackBarWrongTable, setSnackBarWrongTable] = useState(false);

  const formik = useFormik({
    initialValues: {
      ci: "",
      birthDate: "",
      adminPassword: "",
    },
    validationSchema: Yup.object({
      ci: Yup.string()
        .min(5, "El CI no puede tener menos de 5 dígitos")
        .max(10, "El CI no puede tener más de 10 dígitos")
        .matches(/^\d+$/, "Solo se permiten números")
        .required("CI Requerido"),
      birthDate: Yup.date()
        .required("La fecha de nacimiento es requerida")
        .max(eighteenYearsAgo, "Debes ser mayor de 18 años para votar"),
      adminPassword: showAdminPass
        ? Yup.string()
           
            .required("La contraseña es requerida")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const user = await getUser(values.ci, values.birthDate);
        if (user.length > 0) {
          if (user[0].role === "admin") {
            if (showAdminPass) {
              setSnackBarSuccesAdmin(true);
              const admin = await getAdmin(values.ci, values.adminPassword);
              if (admin.length > 0) {
                setIsAdmin(true)
                setUser(user[0])
                setToken(user[0].token)
                setOpenCameraModal(true);
              } else {
                setOpenSnackBar(true);
              }
            }
            setShowAdminPass(true);
          } else {
            if (
              !isAtLeast65YearsOld(user.birthDate) &&
              (user.lastName < votingTable.start || user.lastName > votingTable.end)
            ) {
              setSnackBarWrongTable(true);
              return
            }
            setIsAdmin(false)
            setUser(user[0]);
            setToken(user[0].token);
            if (user[0].hasVoted) {
              setSnackBarVoted(true);
              logout();
            } else {
              setSnackBarSucces(true);
              setOpenCameraModal(true);
            }
          }
        } else {
          setOpenSnackBar(true);
        }
      } catch (error) {
        console.error("Error al buscar el usuario:", error);
        setOpenSnackBar(true);
      }
    },
  });

  const closeSnackBars = () => {
    setOpenSnackBar(false);
    setSnackBarVoted(false);
    setSnackBarSucces(false);
    setSnackBarSuccesAdmin(false);
  };

  const [votingTable, setVotingTable] = useState<Table>({} as Table);
  const getVotingTable = async () => {
    const res = await getTableService(
      import.meta.env.VITE_RECINTO,
      import.meta.env.VITE_MESA
    );
    setVotingTable(res);
  };
  useEffect(() => {
    getVotingTable();
  }, []);

  return {
    openCameraModal,
    closeModal,
    formik,
    showAdminPass,
    openSnackBar,
    closeSnackBars,
    snackBarVoted,
    snackBarSucces,
    snackBarSuccesAdmin,
    votingTable,
    snackBarWrongTable,
  };
};
