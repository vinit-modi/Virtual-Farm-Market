import React, { useEffect } from "react";
import UsersideFaqsUI from "../../components/UsersideFaqsUI/UsersideFaqsUI";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USER_FAQS } from "../../Redux/Reducers/faqsReducer";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

function FaqsUser() {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch({ type: GET_ALL_USER_FAQS });
  }, []);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          m: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h4" variant="h4">
          Frequently Asked Questions
        </Typography>
        {faqs.loading ? (
          <CircularProgress />
        ) : (
          <>
            <UsersideFaqsUI faqs={faqs.faqsDetailsForUsers} />
          </>
        )}
      </Box>
    </div>
  );
}

export default FaqsUser;
