import {
  Box,
  Button,
  Input,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CMS_MESSAGE,
  GET_CMS_OBJECT_ADMIN,
  GET_CMS_UPDATE_ADMIN,
} from "../../Redux/Reducers/cmsReducer";

import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import { toast } from "react-toastify";

function UICms({ PAGE_KEY, PageTitle }) {
  const dispatch = useDispatch();
  const cms = useSelector((state) => state.cms);

  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    dispatch({ type: GET_CMS_OBJECT_ADMIN, payload: { titleKey: PAGE_KEY } });
  }, []);

  useEffect(() => {
    if (cms.message) {
      toast.success(cms.message);
      dispatch({ type: GET_CMS_OBJECT_ADMIN, payload: { titleKey: PAGE_KEY } });
      dispatch({ type: CLEAR_CMS_MESSAGE });
    }
  }, [cms.message]);

  return (
    <div>
      {cms.cmsDetailsAdmin ? (
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
              <>Edit {PageTitle}</>
            </Typography>
            {cms.loading ? (
              <LinearProgress color="success" />
            ) : (
              <Formik
                initialValues={{
                  titleValue: cms.cmsDetailsAdmin.titleValue,
                  content: cms.cmsDetailsAdmin.content,
                }}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  dispatch({
                    type: GET_CMS_UPDATE_ADMIN,
                    payload: {
                      _id: cms.cmsDetailsAdmin?._id,
                      titleKey: PAGE_KEY,
                      titleValue: values.titleValue,
                      content: values.content,
                    },
                  });
                  resetForm();
                }}
              >
                <Form className="m-4">
                  <Typography
                    sx={{
                      marginTop: 4,
                      marginLeft: 1,
                      fontSize: "2em",
                    }}
                  >
                    Edit Title
                  </Typography>
                  <Field name="titleValue">
                    {({ field }) => (
                      // <TextField
                      <Input
                        {...field}
                        // label="Edit Title"
                        variant="filled"
                        sx={{
                          ml: 2,
                          width: "90%",
                          fontSize: 20,
                        }}
                        margin="dense"
                        placeholder="Edit Title here..."
                      />
                    )}
                  </Field>

                  <Field name="content">
                    {({ field }) => (
                      <>
                        <Typography
                          sx={{
                            marginTop: 3,
                            marginLeft: 1,
                            fontSize: "2em",
                          }}
                        >
                          Edit Content
                        </Typography>
                        <Textarea
                          {...field}
                          placeholder="Type something here…"
                          minRows={3}
                          endDecorator={
                            <Box
                              sx={{
                                display: "flex",
                                gap: "var(--Textarea-paddingBlock)",
                                pt: "var(--Textarea-paddingBlock)",
                                borderTop: "1px solid",
                                borderColor: "divider",
                                flex: "auto",
                              }}
                            >
                              <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) =>
                                  setAnchorEl(event.currentTarget)
                                }
                              >
                                <FormatBold />
                                <KeyboardArrowDown fontSize="md" />
                              </IconButton>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{ "--ListItemDecorator-size": "24px" }}
                              >
                                {["200", "normal", "bold"].map((weight) => (
                                  <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                      setFontWeight(weight);
                                      setAnchorEl(null);
                                    }}
                                    sx={{ fontWeight: weight }}
                                  >
                                    <ListItemDecorator>
                                      {fontWeight === weight && (
                                        <Check fontSize="sm" />
                                      )}
                                    </ListItemDecorator>
                                    {weight === "200" ? "lighter" : weight}
                                  </MenuItem>
                                ))}
                              </Menu>
                              <IconButton
                                variant={italic ? "soft" : "plain"}
                                color={italic ? "primary" : "neutral"}
                                aria-pressed={italic}
                                onClick={() => setItalic((bool) => !bool)}
                              >
                                <FormatItalic />
                              </IconButton>
                            </Box>
                          }
                          sx={{
                            minWidth: 300,
                            fontWeight,
                            fontStyle: italic ? "italic" : "initial",
                            ml: 2,
                            mt: 1,
                          }}
                        />
                      </>
                    )}
                  </Field>
                  <div className="d-flex justify-content-end m-3">
                    <Button
                      disableElevation
                      sx={{
                        ml: 1,
                        width: "20%",
                        "&:hover": {
                          backgroundColor: "#688dffd8",
                          color: "white",
                        },
                      }}
                      onClick={() =>
                        dispatch({
                          type: GET_CMS_OBJECT_ADMIN,
                          payload: { titleKey: PAGE_KEY },
                        })
                      }
                      variant="outlined"
                      color="primary"
                    >
                      Reset
                    </Button>

                    <Button
                      disableElevation
                      sx={{ ml: 1, width: "20%" }}
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Formik>
            )}
          </Paper>
        </Box>
      ) : null}
    </div>
  );
}

export default UICms;
