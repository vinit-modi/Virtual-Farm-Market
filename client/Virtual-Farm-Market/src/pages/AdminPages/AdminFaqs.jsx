import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import UsersideFaqsUI from "../../components/UsersideFaqsUI/UsersideFaqsUI.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE_FAQS,
  GET_ADD_ADMIN_FAQS,
  GET_ALL_ADMIN_FAQS,
  GET_DELETE_ADMIN_FAQS,
  GET_OBJECT_OF_ADMIN_FAQS,
  GET_UPDATE_FAQS_ADMIN,
} from "../../Redux/Reducers/faqsReducer.jsx";
import { Formik, Field, Form } from "formik";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminFaqs() {
  const [addFAQOpen, setAddFAQOpen] = useState(false);
  const faqs = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddFAQToggle = () => {
    setAddFAQOpen(!addFAQOpen);
  };

  const handleUpdate = (_id) => {
    console.log(_id);
    dispatch({ type: GET_OBJECT_OF_ADMIN_FAQS, payload: { _id: _id } });
  };

  const handleDelete = (_id) => {
    console.log(_id);
    dispatch({ type: GET_DELETE_ADMIN_FAQS, payload: { _id: _id } });
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_ADMIN_FAQS });
  }, []);

  useEffect(() => {
    if (!addFAQOpen) dispatch({ type: CLEAR_MESSAGE_FAQS });
  }, [addFAQOpen]);

  useEffect(() => {
    faqs.faqsObjectForUpdateAdmin ? setAddFAQOpen(true) : setAddFAQOpen(false);
  }, [faqs.faqsObjectForUpdateAdmin]);

  useEffect(() => {
    if (faqs.message) {
      toast.success(faqs.message);
      dispatch({ type: CLEAR_MESSAGE_FAQS });
      dispatch({ type: GET_ALL_ADMIN_FAQS });
      setAddFAQOpen(false);
    }
  }, [faqs.message]);

  return (
    <>
      <Typography
        sx={{
          fontSize: 50,
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Stack direction={"column"} spacing={1}>
        <div className="d-flex justify-content-end me-5 mt-3">
          <Button onClick={handleAddFAQToggle} variant="contained">
            {!addFAQOpen ? (
              <>
                <AddIcon />
                {`Add FAQ`}
              </>
            ) : (
              <>
                <CloseIcon />
                {`Close`}
              </>
            )}
          </Button>
        </div>
        {addFAQOpen && (
          <Box>
            <Paper elevation={4} sx={{ mx: 5, p: 3 }}>
              <Typography
                variant="h3"
                className="ms-4"
                sx={{
                  fontFamily: "sans-serif",
                  color: green[500],
                }}
              >
                {faqs.faqsObjectForUpdateAdmin ? <>Update FAQ</> : <>Add FAQ</>}
              </Typography>
              {faqs.loading ? (
                <LinearProgress color="success" />
              ) : (
                <Formik
                  initialValues={
                    faqs.faqsObjectForUpdateAdmin
                      ? {
                          question: faqs.faqsObjectForUpdateAdmin.question,
                          answer: faqs.faqsObjectForUpdateAdmin.answer,
                        }
                      : {
                          question: "",
                          answer: "",
                        }
                  }
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    faqs.faqsObjectForUpdateAdmin
                      ? dispatch({
                          type: GET_UPDATE_FAQS_ADMIN,
                          payload: {
                            _id: faqs.faqsObjectForUpdateAdmin._id,
                            question: values.question,
                            answer: values.answer,
                          },
                        })
                      : dispatch({ type: GET_ADD_ADMIN_FAQS, payload: values });
                    resetForm();
                  }}
                >
                  <Form>
                    <Field name="question">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Add FAQ's Question"
                          variant="filled"
                          sx={{
                            width: "100%",
                          }}
                          margin="dense"
                        />
                      )}
                    </Field>

                    <Field name="answer">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Add FAQ's Answer"
                          variant="filled"
                          multiline
                          rows={6}
                          sx={{
                            width: "100%",
                          }}
                          margin="dense"
                        />
                      )}
                    </Field>

                    <Button
                      disableElevation
                      sx={{ ml: 1 }}
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ ml: 1 }}
                      color="primary"
                      onClick={() => setAddFAQOpen(false)}
                    >
                      Close
                    </Button>
                  </Form>
                </Formik>
              )}
            </Paper>
          </Box>
        )}

        {faqs.loading ? (
          <LinearProgress color="success" />
        ) : (
          <>
            {faqs.loading ? (
              <LinearProgress color="success" />
            ) : (
              <div className="d-flex justify-content-center w-100 mt-5">
                <UsersideFaqsUI
                  faqs={faqs.faqsDetailsForAdmin}
                  updateKey={"update"}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            )}
          </>
        )}
      </Stack>
    </>
  );
}

export default AdminFaqs;
