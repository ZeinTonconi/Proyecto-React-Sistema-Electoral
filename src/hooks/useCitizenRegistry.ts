import * as Yup from "yup";
import { useEffect, useState } from "react";
import { getPlaces } from "../services/Places";
import { registerUser } from "../services/Auth";
import { useFormik } from "formik";

export const useCitizenRegistry = (onClose: () => void) => {
  const userSchema = Yup.object({
    ci: Yup.string()
      .min(5, "El CI no puede tener menos de 5 dígitos")
      .max(10, "El CI no puede tener más de 10 dígitos")
      .matches(/^\d+$/, "Solo se permiten números")
      .required("CI Requerido"),
    birthDate: Yup.date()
      .required("La fecha de nacimiento es requerida")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Debes ser mayor de 18 años para votar"
      ),
    name: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(25, "El nombre no puede tener más de 25 caracteres")
      .required("Nombre requerido"),
    lastName: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(25, "El apellido no puede tener más de 25 caracteres")
      .required("Apellido requerido"),
    place: Yup.string().required("Lugar de votación requerido"),
    userPhoto: Yup.string().required("Foto de usuario requerida"),
  });

  const [openCameraModal, setOpenCameraModal] = useState(false);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [places, setPlaces] = useState<string[]>([]);

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
        const user = await registerUser(
          values.ci,
          values.birthDate,
          values.name,
          values.lastName,
          values.userPhoto,
          idPlace
        );
        handleClose();
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    },
  });

  const openCamera = () => setOpenCameraModal(true);

  const closeModalCamera = () => {
    setOpenCameraModal(false);
    setIsPhotoTaken(true);
  };

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
  };
};
