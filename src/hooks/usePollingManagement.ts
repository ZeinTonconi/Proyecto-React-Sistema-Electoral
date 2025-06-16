
import * as Yup from "yup";
import { addTableToPlaceService, deleteTableFromPlaceService, getPlaceById, updateTableService } from "../services/Places";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import type { Place } from "../components/VotingTablesList";
import { votingCentersStore } from "../store/votingCentersStore";

export const usePollingManagement = () => {
    const spanishLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

  const tableSchema = Yup.object({
    start: Yup.string()
      .matches(
        spanishLettersRegex,
        "Solo se permiten letras del alfabeto español"
      )
      .max(25, "Maximo 25 caracteres")
      .required("Este campo es obligatorio"),
    end: Yup.string()
      .matches(
        spanishLettersRegex,
        "Solo se permiten letras del alfabeto español"
      )
      .max(25, "Maximo 25 caracteres")
      .required("Este campo es obligatorio"),
  });

  const handleSubmit = async (values: { start: string; end: string }) => {
    const { start, end } = values;
    if (start > end) {
        formik.setFieldError(
          "start-greater-than-end",
          `Rango Invalido, ${end} viene antes que ${start}`
        );
        return;
      }
    if (selectedTable) {
      const updatedTable = {
        ...selectedTable,
        start,
        end,
      };

      const newTables = await updateTableService(selectedPlace, updatedTable);
      setTables(newTables);
      setSelectedPlace((prev) => ({ ...prev, votingTables: newTables }));
      setSelectedTable(null);
    } else {
      
      const newTables = await addTableToPlaceService(selectedPlace!.id, {
        start,
        end,
      });

      setTables(newTables);
      setSelectedPlace((prev) => ({ ...prev, votingTables: newTables }));
    }
    formik.resetForm();
    setOpenDialog(false);
  };

  const formik = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    validationSchema: tableSchema,
    onSubmit: handleSubmit,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [tables, setTables] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const { zones, loadZones } = votingCentersStore();

  useEffect(() => {
    if (zones.length === 0) {
      loadZones();
    }
  }, []);

  const handlePlaceSelect = async (zoneId: string, placeId: string) => {
    const [place] = await getPlaceById(placeId);
    setSelectedPlace({ zoneId, ...place });
    setTables(place.votingTables || []);
  };

  const deleteSelectedTable = async () => {
    const newTables = await deleteTableFromPlaceService(
      selectedPlace!.id,
      selectedTable,
      selectedPlace
    );
    setTables(newTables);
  };

  const setFormSelectedTable = (table: Table) => {
    setSelectedTable(table);
    if (table) {
      const { start, end } = table;
      formik.setValues({
        start,
        end,
      });
    }
  };

  return {
    selectedPlace, 
    openDialog,
    setOpenDialog,
    formik,
    zones, 
    handlePlaceSelect,
    tables,
    setFormSelectedTable,
    deleteSelectedTable
  }

}