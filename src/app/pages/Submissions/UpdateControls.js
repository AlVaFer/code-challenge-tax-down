import React from "react";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";

const UpdateControls = ({ i, filteredSubmissions = [], handleUpdate }) => (
  <>
    <label>Id: </label>
    <Input
      margin="normal"
      required
      fullWidth
      defaultValue={filteredSubmissions[i]?.id}
      id="id"
      label="Id"
      name="id"
    />
    <label>Name: </label>
    <Input
      margin="normal"
      required
      fullWidth
      defaultValue={filteredSubmissions[i]?.name}
      id="name"
      label="Name"
      name="name"
    />
    <label>Surname: </label>
    <Input
      margin="normal"
      required
      fullWidth
      id="surname"
      defaultValue={filteredSubmissions[i]?.surname}
      label="Surname"
      name="surname"
    />
    <label>Age: </label>
    <Input
      margin="normal"
      required
      fullWidth
      id="age"
      defaultValue={filteredSubmissions[i]?.age}
      label="Age"
      name="age"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => handleUpdate()}
    >
      SAVE
    </Button>
  </>
);

export default UpdateControls;
