import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  List,
  ListItemButton,
  Typography,
  ListItem,
  Divider,
  Card,
  Button,
  Box,
} from "@mui/material";
import { selectTaxes } from "../../store/taxesSlice";
import CommonLayout from "../../layouts/Layout";

const Taxes = () => {
  const taxes = useSelector(selectTaxes);

  return (
    <CommonLayout title="Taxes">
      <Card sx={{ minWidth: "400px" }}>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {taxes.map((tax) => (
            <React.Fragment key={tax.id}>
              <ListItemButton alignItems="flex-start">
                <ListItem sx={{ display: "block" }}>
                  <>
                    <Typography
                      component="span"
                      variant="h6"
                      color="text.primary"
                      sx={{ display: "block" }}
                    >
                      {tax.name}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Year: {tax.year}
                    </Typography>
                    <Box>
                      <Button
                        component={Link}
                        to={`/tax/${tax.id}`}
                        variant="contained"
                      >
                        Add submission
                      </Button>
                    </Box>
                  </>
                </ListItem>
              </ListItemButton>
              <Divider variant="inset" />
            </React.Fragment>
          ))}
          <Box display="flex" justifyContent="flex-end">
            <Button
              component={Link}
              to={`/submissions`}
              style={{
                borderRadius: 5,
                backgroundColor: "#21b6ae",
                padding: "18px 36px",
                fontSize: "16px",
                color: "white"
              }}
            >
              List of submissions
            </Button>
          </Box>
          <Divider variant="inset" />
        </List>
      </Card>
    </CommonLayout>
  );
};

export default Taxes;
