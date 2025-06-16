import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { deletePlace, getPlaces } from "../services/Places";
import CenterList from "../components/CenterList";
import { ConfirmActionDialog } from "../components/ConfirmActionDialog";
import CenterRegisterForm from "../components/CenterRegisterForm";

const CenterManagement = () => {
  const [openCenterRegister, setOpenCenterRegister] = useState(false);

  const handleOpenRegisterUser = () => setOpenCenterRegister(true);
  const handleCloseRegisterUser = () => {
    setOpenCenterRegister(false);
    fetchPlaces();
  };
  const [places, setPlaces] = useState<any[]>([]);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [selectedCenter, setSelectedCenter] = useState("");

  const [selectedEdit, setSelectedEdit] = useState(null);

  const deleteCenter = async () => {
    await deletePlace(selectedCenter);
  };

  const openDeleteDialog = (id: string) => {
    setSelectedCenter(id);
    setOpenConfirmDialog(true);
  };

  const openEditForm = (center: any) => {
    setSelectedEdit(center);
    setOpenCenterRegister(true);
  };

  const fetchPlaces = async () => {
    try {
      const response = await getPlaces();
      const placeRes = response.map((p) => 
        ({
          ...p,
          numberOfTable: p.votingTables ? p.votingTables.length : 0,
        }));
      setPlaces(placeRes);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };
  useEffect(() => {
    fetchPlaces();
  }, []);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ marginTop: 0 }}>
          Gestión de Centros de Votación
        </Typography>
        <CenterRegisterForm
          open={openCenterRegister}
          onClose={handleCloseRegisterUser}
          center={selectedEdit}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: "auto",
            borderRadius: "8px",
          }}
          onClick={handleOpenRegisterUser}
        >
          Agregar Centro de Votación
        </Button>
      </div>
      <CenterList
        centers={places}
        deleteAction={openDeleteDialog}
        editAction={openEditForm}
      />
      <ConfirmActionDialog
        confirmAction={deleteCenter}
        handleClose={() => {
          setOpenConfirmDialog(false);
        }}
        handleCloseSuccess={() => {
          fetchPlaces();
          setOpenConfirmDialog(false);
        }}
        message="Una vez borrado el centro de votacion no se podra recuperarlo despues"
        open={openConfirmDialog}
      />
    </>
  );
};

export default CenterManagement;
