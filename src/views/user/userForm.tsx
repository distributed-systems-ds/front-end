import { Typography, TextField, ThemeProvider, Container } from "@mui/material";
import { Box, createTheme, FormControl, InputLabel } from "@mui/material";
import { OutlinedInput, Button, Autocomplete } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UserServices from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface props {
  rolAdmin: Boolean;
  roles: any;
}

const formUser = {
  email: "",
  password: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  address: "",
  birthDate: "",
  role: "USER",
};

const UserForm: React.FC<props> = ({ rolAdmin, roles }) => {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3d3d3d",
      },
      secondary: {
        main: "#3d3d3d",
      },
    },
  });

  const [dataUser, setDataUser] = useState(formUser);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };

  const handleDate = (date: Date) => {
    const fecha = new Date(date.toString());

    const newDate = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}`;

    setDataUser({ ...dataUser, birthDate: newDate });
  };

  const handleRole = (role: any) => {
    setDataUser({ ...dataUser, role: role });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(dataUser);

      await UserServices.addUser(dataUser);
      navigate("/login", { replace: true });
    } catch (error: any) {
      const errorConfigurations: any = {
        400: {
          title: "Error al crear usuarios",
          html: "Llena todos los campos",
        },
        500: {
          title: "Error al crear usuarios",
          html: "Puede que el telefono o correo electronico ya existan",
        },
      };

      const status = error.response?.status;
      const configuration = errorConfigurations[status];

      if (configuration) {
        Swal.fire({
          icon: "error",
          title: `<span style="font-family: Arial, sans-serif;">${configuration.title}</span>`,
          html: `<div style="font-family: Arial, sans-serif;">${configuration.html}</div>`,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ textAlign: "center" }}
            >
              Crea una cuenta
            </Typography>
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoFocus
              sx={{ mb: 3 }}
              onChange={handleChange}
            />
            <FormControl
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ mb: 1 }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="phoneNumber"
              type="number"
              label="Número de teléfono"
              name="phoneNumber"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="firstName"
              label="Nombres"
              name="firstName"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="lastName"
              label="Apellidos"
              name="lastName"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              color="primary"
              margin="normal"
              fullWidth
              id="address"
              label="Dirección"
              name="address"
              autoFocus
              sx={{ mb: 3 }}
              onChange={handleChange}
            />
            {rolAdmin && roles ? (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={roles}
                sx={{ width: "100%", mb: 3 }}
                onChange={(_event, newValue) => {
                  handleRole(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Rol" />}
              />
            ) : null}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                sx={{ width: "100%" }}
                onChange={(date) => handleDate(date as Date)} // Asegúrate de realizar la conversión de tipos aquí
              />
            </LocalizationProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 5,
                bgcolor: "#D3D3D3",
                color: "black",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                  transition: "0.5s",
                },
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
