import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

function PaymentAlert(props) {
  const { handleGoToPaymentPage } = props;
  return (
    <Alert sx={{ minWidth: 400 }} severity="warning">
      <AlertTitle sx={{ fontSize: 20 }}>Warning</AlertTitle>
      <Typography sx={{ my: 2 }} variant="h4">
        Add/Select Payment Card
      </Typography>
      <Typography>
        <strong>check it out! here</strong>&nbsp;-&nbsp;
        <Button
          sx={{
            color: "white",
            bgcolor: green["A700"],
            "&:hover": { bgcolor: green[700] },
          }}
          onClick={() => handleGoToPaymentPage()}
        >
          Payment
        </Button>
      </Typography>
    </Alert>
  );
}

export default PaymentAlert;
