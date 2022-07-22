import React from "react";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Button, Box } from "@mui/material";
import { Icon } from "@mui/material";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { logout } from "../store/taxesSlice";

export default function ButtonAppBar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const logOutBtn = pathname !== ROUTES.SIGNIN && (
    <Button component={Link} to={ROUTES.SIGNIN} variant="contained" onClick={handleLogout}>
        LOGOUT
    </Button>
  );

  let backBtn;
  if(pathname === ROUTES.SUBMISSIONS || pathname.includes('/tax/')){
      const link = ROUTES.TAXES;
      const textBackBtn = 'Taxes'; 
      backBtn = <Button component={Link} to={link} variant="contained">
      {textBackBtn}
    </Button>
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Icon
            sx={{
              fontSize: 30,
              verticalAlign: "super",
              marginRight: 3,
              marginBottom: 2,
            }}
          >
            <img src={Logo} alt="Logo" height={20} width={20} />
          </Icon>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CODE-CHALLENGE - TAXDOWN - ÁLVARO VALLEJOS
          </Typography>
          {backBtn}
          {logOutBtn}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
