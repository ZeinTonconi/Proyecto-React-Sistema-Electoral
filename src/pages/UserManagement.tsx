import { Button, Container, Box, Typography  } from "@mui/material";
import RegisterUsers from "../components/RegisterUsersForm";
import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { useUserStore } from "../store/userStore";


function UserManagement() {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const handleOpenRegisterUser = () => setOpenRegisterUser(true);
  const handleCloseRegisterUser = () => {
    setOpenRegisterUser(false);
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ml:0, mr:0}}>
      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={handleOpenRegisterUser}
        >
          Agregar Usuario
        </Button>
      </Box>
      <RegisterUsers open={openRegisterUser} onClose={handleCloseRegisterUser} />
      <Typography variant="h5" gutterBottom >
        Usuarios
      </Typography>
      <UsersList users={users} />
    </Container>
  );
}

export default UserManagement;
