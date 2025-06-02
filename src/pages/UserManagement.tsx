import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { Box, Typography } from "@mui/material";
import { getUsers } from "../services/Auth";

function UserManagement() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        const formattedUsers = usersData.map(user => ({
          id: user.id,
          nombre: user.name,
          apellido: user.lastName,
          ci: user.ci,
          rol: user.role,
          centroVotacion: `Centro ${user.placeId}`, 
          voto: user.hasVoted
        }));
        setUsers(formattedUsers);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Usuarios
      </Typography>
      <UsersList users={users} />
    </Box>
  );
}

export default UserManagement;