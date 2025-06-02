import { Button, Container, Box, Typography  } from "@mui/material";
import RegisterUsers from "../components/RegisterUsersForm";
import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { getUsers } from "../services/Auth";

function UserManagement() {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);

  const handleOpenRegisterUser = () => setOpenRegisterUser(true);
  const handleCloseRegisterUser = () => setOpenRegisterUser(false);


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
    <Container>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, borderRadius: 2 }}
        onClick={handleOpenRegisterUser}
      >
        Agregar Usuario
      </Button>

      <RegisterUsers open={openRegisterUser} onClose={handleCloseRegisterUser} />
      <Typography variant="h5" gutterBottom>
        Usuarios
      </Typography>
      <UsersList users={users} />
    </Container>
  );
}

export default UserManagement;
