import { Button, Container } from "@mui/material";
import { useState } from "react";
import RegisterUsers from "../components/RegisterUsersForm";
function UserManagement() {
  const [openRegisterUser, setOpenRegisterUser] = useState(false);

  const handleOpenRegisterUser = () => setOpenRegisterUser(true);
  const handleCloseRegisterUser = () => setOpenRegisterUser(false);

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
    </Container>
  );
}

export default UserManagement;
