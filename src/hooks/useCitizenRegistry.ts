import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getPlaces } from "../services/Places";
import { registerUser } from "../services/Auth";
import { useFormik } from "formik";
import { t } from "i18next";

export const useCitizenRegistry = (onClose: () => void) => {
  const userSchema = Yup.object({
    ci: Yup.string()
      .min(5, t("citizenRegister.ci_min_length"))
      .max(10, t("citizenRegister.ci_max_length"))
      .matches(/^\d+$/, t("citizenRegister.ci_numeric"))
      .required(t("citizenRegister.required_ci")),
    birthDate: Yup.date()
      .required(t("citizenRegister.required_birth_date"))
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        t("citizenRegister.birth_date_max")
      ),
    name: Yup.string()
      .min(2, t("citizenRegister.name_min_length"))
      .max(25, t("citizenRegister.name_max_length"))
      .required(t("citizenRegister.required_name")),
    lastName: Yup.string()
      .min(2, t("citizenRegister.last_name_min_length"))
      .max(25, t("citizenRegister.last_name_max_length"))
      .required(t("citizenRegister.required_last_name")),
    place: Yup.string().required(t("citizenRegister.required_place")),
    userPhoto: Yup.string().required(t("citizenRegister.required_user_photo")),
  });

  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [places, setPlaces] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const fetchPlaces = async () => {
    try {
      const response = await getPlaces();
      setPlaces(response);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const formik = useFormik({
    initialValues: {
      ci: "",
      birthDate: "",
      name: "",
      lastName: "",
      place: "",
      userPhoto: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        const idPlace = parseInt(values.place, 10);
        await registerUser(
          values.ci,
          values.birthDate,
          values.name,
          values.lastName,
          values.userPhoto,
          idPlace
        );
        handleClose();
      } catch (error) {
        setErrorMessage(
          t("citizenRegister.error_in_register") + (error as Error).message
        );
        setShowError(true);
      }
    },
  });

  const openCamera = () => setOpenCameraModal(true);

  const closeModalCamera = () => {
    setOpenCameraModal(false);
    setIsPhotoTaken(true);
  };

  const closeSnackbar = () => {
    setShowError(false);
    setErrorMessage("");
  }

  const captureImageCamera = (base64Image: string) => {
    formik.setFieldValue("userPhoto", base64Image);
  };

  const handleClose = () => {
    formik.resetForm();
    setIsPhotoTaken(false);
    onClose();
  };

  return {
    openCameraModal,
    closeModalCamera,
    handleClose,
    formik,
    isPhotoTaken,
    places,
    openCamera,
    captureImageCamera,
    errorMessage,
    showError,
    closeSnackbar,
  };
};
