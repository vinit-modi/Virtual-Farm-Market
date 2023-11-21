import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "./actions/authActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import {
  GET_CATEGORY_LIST_FOR_PRODUCT_FARMER,
  GET_UNIT_LIST_FOR_PRODUCT_FARMER,
} from "../../Redux/Reducers/Farmer/farmerReducer";
import {
  GET_AUTH_LOGOUT,
  GET_CITY_LIST,
} from "../../Redux/Reducers/authReducer";
import LogoutIcon from '@mui/icons-material/Logout';

const initialValues = {
  productName: "",
  productDescription: "",
  productCategory: "",
  productPrice: "",
  productUnit: "",
  productQuantityAvailable: "",
  productImages: [],
  productCity: "",
};

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .typeError("Product Name must be a string")
    .test("not-number", "Product Name cannot be a number", (value) =>
      isNaN(value)
    )
    .test(
      "not-sole-alphanumeric",
      "Product Name cannot be solely alphanumeric",
      (value) => /^\d+$|^[a-zA-Z]+$/.test(value)
    )
    .required("Product Name is required"),
  productDescription: Yup.string().required("Product Description is required"),
  productCategory: Yup.string().required("Product Category is required"),
  productPrice: Yup.number()
    .typeError("Product Price must be a number")
    .required("Product Price is required")
    .test(
      "is-decimal",
      "Product Price should have maximum 2 decimal places and at least one digit before the decimal point",
      (value) => /^\d+(\.\d{1,2})?$/.test(value)
    ),
  productUnit: Yup.string().required("Product Unit is required"),
  productQuantityAvailable: Yup.string()
    .matches(/^[0-9]+$/, "Quantity must be a non-decimal number")
    .required("Quantity Available is required"),
  productCity: Yup.string().required("Product City is required"),
  productImages: Yup.mixed()
    // .test("fileSize", "File Size is too large", (value) => {
    //   if (!value) return true; // Validation is not required if no file is selected
    //   return value.length <= 3; // Adjust the limit as needed
    // })
    // .test("fileType", "Unsupported File Format", (value) => {
    //   if (!value) return true; // Validation is not required if no file is selected
    //   const acceptedFormats = ["image/jpeg", "image/png"]; // Add more supported formats if needed
    //   for (let i = 0; i < value.length; i++) {
    //     if (!acceptedFormats.includes(value[i].type)) {
    //       return false;
    //     }
    //   }
    //   return true;
    // })
    .required("Images are required"),
});

function FarmersAddProduct() {
  const dispatch = useDispatch();
  const farmer = useSelector((state) => state.farmer);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: GET_CATEGORY_LIST_FOR_PRODUCT_FARMER });

    dispatch({ type: GET_UNIT_LIST_FOR_PRODUCT_FARMER });
    dispatch({ type: GET_CITY_LIST });
  }, []);

  const handleSubmit = (values) => {
    const finalProduct = {
      name: values.productName,
      description: values.productDescription,
      category: values.productCategory,
      price: values.productPrice,
      unit: values.productUnit,
      quantityAvailable: values.productQuantityAvailable,
      image: values.productImages,
      city: values.productCity,
    };
    console.log(finalProduct);
    //Send finalProduct to BE
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch({ type: GET_AUTH_LOGOUT });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Farmer Dashboard
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
            edge="end"
            variant="outlined"
            sx={{ "&:hover": { color: "white", bgcolor: "red" } }}
            startIcon={<LogoutIcon/>}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add Product
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      Product name:
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="productName"
                      name="productName"
                      autoComplete="productName"
                    />
                    <ErrorMessage
                      name="productName"
                      id="productName"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      Product description:
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="productDescription"
                      name="productDescription"
                      autoComplete="productDescription"
                    />
                    <ErrorMessage
                      name="productDescription"
                      id="productDescription"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={2}>
                        <Typography variant="h5">Category:</Typography>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Field
                          as={Select}
                          fullWidth
                          id="productCategory"
                          name="productCategory"
                          autoComplete="productCategory"
                          sx={{ mt: 2 }}
                        >
                          {farmer.categoryList &&
                            farmer.categoryList.map((item, index) => (
                              <MenuItem value={item.name} key={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="productCategory"
                          id="productCategory"
                          component="div"
                          className="error text-danger"
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Stack direction={"row"}>
                      <Stack>
                        <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                          Product price($):
                        </Typography>
                        <Field
                          as={TextField}
                          fullWidth
                          id="productPrice"
                          name="productPrice"
                          autoComplete="productPrice"
                        />
                        <ErrorMessage
                          name="productPrice"
                          id="productPrice"
                          component="div"
                          className="error text-danger"
                        />{" "}
                      </Stack>
                      <Stack
                        sx={{
                          ml: 2,
                          display: "flex",
                          alignItems: "end",
                          mt: 2,
                        }}
                      >
                        <Grid container>
                          <Grid item>
                            <Typography variant="h5">Unit:</Typography>
                          </Grid>
                          <Grid item xs={12} sm={10}>
                            <Field
                              as={Select}
                              fullWidth
                              id="productUnit"
                              name="productUnit"
                              autoComplete="productUnit"
                            >
                              {farmer.unitList &&
                                farmer.unitList.map((item, index) => (
                                  <MenuItem value={item.name} key={item._id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage
                              name="productUnit"
                              id="productUnit"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>
                        </Grid>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      Available quantity:
                    </Typography>
                    <Field
                      as={TextField}
                      fullWidth
                      id="productQuantityAvailable"
                      name="productQuantityAvailable"
                      autoComplete="productQuantityAvailable"
                    />
                    <ErrorMessage
                      name="productQuantityAvailable"
                      id="productQuantityAvailable"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" sx={{ ml: 1, mt: 2 }}>
                      Available at city:
                    </Typography>

                    <Field
                      as={Select}
                      fullWidth
                      id="productCity"
                      name="productCity"
                      autoComplete="productCity"
                    >
                      {auth.cityList &&
                        auth.cityList.map((item, index) => (
                          <MenuItem value={item.name} key={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="productCity"
                      id="productCity"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) => {
                        setFieldValue(
                          "productImages",
                          event.currentTarget.files
                        );
                      }}
                    />
                    <ErrorMessage
                      name="productImages"
                      id="productImages"
                      component="div"
                      className="error text-danger"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      startIcon={<AddCircle />}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
}

export default FarmersAddProduct;