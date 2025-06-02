import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getPlaces } from "../services/Places";
import CenterList from "../components/CenterList";

const CenterManagement = () => {
    const [places, setPlaces] = useState<any[]>([]);

    const fetchPlaces = async () => {
        try {
            const response = await getPlaces();
            setPlaces(response);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    }
    useEffect(() => {
        fetchPlaces();
    }, []);
  return (
    <>
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 0 }}>
        Gestión de Centros de Votación
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginLeft: "auto",
          borderRadius: "8px",
        }}
      >
        Agregar Centro de Votación
      </Button>
    </div>
    <CenterList centers={places} />
    </>
  );
};

export default CenterManagement;
