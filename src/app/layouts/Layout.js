import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
import { selectUser } from "../store/taxesSlice";

const Layout = ({ title, children }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="full">
      <Box
        sx={{
          margin: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" className="pb-3">
          <u>{title}</u> 
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
