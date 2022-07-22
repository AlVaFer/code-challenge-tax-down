import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import Layout from "../../layouts/Layout";
import { taxesBase, signin } from "../../store/taxesSlice";
import { LOGIN_DATA } from "../../utils/constants";
import { getTaxes } from "../../services/axios";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (
      email === LOGIN_DATA.USER_EMAIL &&
      password === LOGIN_DATA.USER_PASWORD
    ) {
      dispatch(signin({email, password}));
      const taxes = await getTaxes();
      dispatch(taxesBase(taxes));
      navigate("/taxes");
    }
  };

  return (
    <Layout title="Sign In">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email. Type taxdown to access"
          name="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password. Type taxdown to access"
          type="password"
          id="password"
        />
        <Button
          sx={{ mt: 3, mb: 3 }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Sign In
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;
