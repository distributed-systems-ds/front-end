import { Button } from "@mui/material";
import "./optionsAdm.css";
import { useNavigate } from "react-router-dom";

const OptionsAdmin = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/add_user_admin", { replace: true });
  };

  const handleCrudUser = () => {
    navigate("/crud_users", { replace: true });
  };

  const handleCrudRoles = () => {
    navigate("/crud_role", { replace: true });
  };

  const handleCrudCategories = () => {
    navigate("/crud_categories", { replace: true });
  };

  const handleCrudItems = () => {
    navigate("/crud_items", { replace: true });
  };

  return (
    <>
      <div className="container-options">
        <div className="container-options-top">
          <Button
            onClick={handleCreateUser}
            variant="contained"
            sx={{
              width: "20%",
              height: "60px",
              mt: 3,
              mb: 2,
              bgcolor: "#D3D3D3",
              color: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                transition: "0.5s",
              },
            }}
          >
            Crear Usuarios
          </Button>
          <Button
            onClick={handleCrudUser}
            variant="contained"
            sx={{
              width: "20%",
              mt: 3,
              mb: 2,
              bgcolor: "#D3D3D3",
              color: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                transition: "0.5s",
              },
            }}
          >
            Gestionar Usuarios
          </Button>
          <Button
            onClick={handleCrudRoles}
            variant="contained"
            sx={{
              width: "20%",
              mt: 3,
              mb: 2,
              bgcolor: "#D3D3D3",
              color: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                transition: "0.5s",
              },
            }}
          >
            Gestionar Roles
          </Button>
          <Button
            onClick={handleCrudItems}
            variant="contained"
            sx={{
              width: "20%",
              mt: 3,
              mb: 2,
              bgcolor: "#D3D3D3",
              color: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                transition: "0.5s",
              },
            }}
          >
            Gestionar CD's
          </Button>
        </div>
        <div className="container-options-bottom">
          <Button
            onClick={handleCrudCategories}
            variant="contained"
            sx={{
              width: "20%",
              height: "60px",
              mt: 3,
              mb: 2,
              bgcolor: "#D3D3D3",
              color: "black",
              "&:hover": {
                bgcolor: "black",
                color: "white",
                transition: "0.5s",
              },
            }}
          >
            Gestionar categorias
          </Button>
        </div>
      </div>
    </>
  );
};

export default OptionsAdmin;
