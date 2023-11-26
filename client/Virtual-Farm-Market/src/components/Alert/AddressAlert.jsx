import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import { AddCircle } from "@mui/icons-material";

function AddressAlert({handleGoToAddressPage}) {
  return (
    <Alert sx={{ minWidth: 400 }} severity="warning">
      <AlertTitle sx={{ fontSize: 20 }}>Warning</AlertTitle>
      <Typography sx={{ my: 2 }} variant="h4">
        Add new address
      </Typography>
      <Typography>
        <strong>check it out! here</strong>&nbsp;-&nbsp;
        <Button variant="contained" startIcon={<AddCircle/>} onClick={() => handleGoToAddressPage()}>
          Add address
        </Button>
      </Typography>
    </Alert>
  );
}

export default AddressAlert;
