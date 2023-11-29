import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import FarmersAddProduct from "./FarmersAddProduct";
import FarmersDelivery from "./FarmersDelivery";
import ProtectedRoute from "../../auth/ProtectedRoute";
import PageNotFound from "../PageNotFound/PageNotFound";
import { AddCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import { green } from "@mui/material/colors";

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
import { GET_AUTH_LOGOUT } from "../../Redux/Reducers/authReducer";
import { useDispatch } from "react-redux";

function FarmerRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: GET_AUTH_LOGOUT });
  };

  const handleOrder = () => {
    navigate("/farmer/delivery");
  };

  const handleAddProduct = () => {
    navigate("/farmer/addproduct");
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ bgcolor: green["A700"] }}>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              Farmer Dashboard
            </Typography>
            <Button
              color="inherit"
              onClick={handleAddProduct}
              edge="end"
              variant="outlined"
              sx={{
                ml: 3,
                "&:hover": { color: "white", border: "none" },
              }}
            >
              Add Product
            </Button>
            <Button
              color="inherit"
              onClick={handleOrder}
              edge="end"
              variant="outlined"
              sx={{
                ml: 3,
                "&:hover": { color: "white", border: "none" },
              }}
            >
              Order Status
            </Button>
          </Box>

          <Button
            color="inherit"
            onClick={handleLogout}
            edge="end"
            variant="outlined"
            sx={{
              "&:hover": { color: "white", bgcolor: "red", border: "none" },
            }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 15 }}>
        <Box sx={{ mb: 4 }}>
          <Routes>
            <Route
              exact
              path="addproduct"
              element={
                <ProtectedRoute
                  path="/farmer/addproduct"
                  userTypeAllowed="Farmer"
                >
                  <FarmersAddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="delivery"
              element={
                <ProtectedRoute
                  path="/farmer/delivery"
                  userTypeAllowed="Farmer"
                >
                  <FarmersDelivery />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />{" "}
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default FarmerRoute;
