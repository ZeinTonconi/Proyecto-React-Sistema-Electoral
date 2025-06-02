  import { useState, useEffect } from "react";
  import UserCard from "../components/UserCard";
  import { getStorage } from "../helpers/LocalStorage";
  import { getPlaceById } from "../services/Places";

  export default function Dashboard() {
    const user = getStorage("user");
    const [placeName, setPlaceName] = useState("");

    useEffect(() => {
      const fetchPlace = async () => {
          try {
            const data = await getPlaceById(user.placeId);
            console.log("Recinto:", user);
            setPlaceName(data[0]?.name || ""); 
          } catch (error) {
            console.error("Error al cargar el recinto", error);
          }
      };
      fetchPlace();
    }, [user]);

    const labelAndData = [
      { label: "Nombre(s)", data: user?.name || "" },
      { label: "Apellido(s)", data: user?.lastName || "" },
      { label: "Carnet de Identidad", data: user?.ci || "" },
      { label: "Recinto", data: placeName },
      { label: "Mesa", data: user?.numberPlace || "" },
      { label: "Fecha de Nacimiento", data: user?.birthDate || "" },
      { label: "Estado de Voto", data: user?.hasVoted ? "Votó" : "No votó" }
    ];
    return (
      <>
        <h1 style={{ marginBlock: 0 }}>Inicio</h1>
        <UserCard labelAndData={labelAndData} addPhoto = {true}/>
      </>
    );
  }
