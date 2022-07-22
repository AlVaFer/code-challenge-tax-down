import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, Box } from "@mui/material";
import Layout from "../../layouts/Layout";
import { withRouter } from "../../utils/misc";
import { addSubmission } from "../../store/taxesSlice";
import { getInputFields } from "../../services/axios";

const Form = ({ params: { id }, navigate }) => {
  const [inputs, setInputs] = useState([]);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputsSendData = {
      name: e.target[0].value,
      surname: e.target[2].value,
      age: e.target[4].value,
    };
    dispatch(addSubmission({ ...inputsSendData, id }));
    navigate("/taxes", { replace: true });
  };

  useEffect(() => {
    (async () => {
      setInputs(await getInputFields());
    })();
  }, [setInputs]);

  return (
    <Layout title="Tax Form">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {inputs.map(({ id, type, label, placeholder, maxLength }) => (
          <TextField
            key={id}
            name={id}
            type={type}
            label={label}
            required
            fullWidth
            margin="normal"
            placeholder={placeholder}
            inputProps={maxLength && { maxLength }}
          />
        ))}
        <Box>
          <Button type="submit" variant="contained" sx={{ mt: 1, mb: 5 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default withRouter(Form);
