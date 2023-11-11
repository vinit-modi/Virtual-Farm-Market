import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  ButtonGroup,
  LinearProgress,
  Paper,
  Stack,
} from "@mui/material";
import EmptyFoodImage from "../../Assets/EmptyProduct/EmptyFoodImage.jpg";
import { red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import {
  GET_ADD_PRODUCT_TO_CART,
  GET_ALLPRODUCTS_CART,
  GET_REMOVE_PRODUCT_TO_CART,
} from "../../Redux/Reducers/cartReducer";
import { useEffect } from "react";

function CartCard({ item }) {
  const { product, seller } = item;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
    console.log(item.quantity);
  }, []);

  const handleAddQuantity = () => {
    dispatch({ type: GET_ADD_PRODUCT_TO_CART, payload: { _id: product._id } });
    dispatch({ type: GET_ALLPRODUCTS_CART });
  };

  const handleRemoveQuantity = () => {
    dispatch({
      type: GET_REMOVE_PRODUCT_TO_CART,
      payload: { _id: product._id },
    });
    dispatch({ type: GET_ALLPRODUCTS_CART });
  };

  return (
    <Box sx={{ borderBottom: "1px solid #ccc", padding: 2 }}>
      {item ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Paper elevation={3}>
              <Avatar
                variant="rounded"
                src={
                  product.images && product.images.length
                    ? product?.images[0]
                    : EmptyFoodImage
                }
                alt={product.name}
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column">
                <Typography variant="h6">{product.name}</Typography>
                <Typography sx={{ mt: 0.3 }}>Quantity:&nbsp;</Typography>
                <ButtonGroup
                  size="small"
                  variant="contained"
                  aria-label="counter buttons"
                >
                  <Button onClick={() => handleRemoveQuantity()}>-</Button>
                  <Typography
                    style={{
                      width: 40,
                      height: 30,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 18,
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <Button onClick={() => handleAddQuantity()}>+</Button>
                </ButtonGroup>
              </Stack>
              <Stack>
                <Typography>Price:&nbsp;{product.price}</Typography>
                <Typography>
                  Total:&nbsp;{item.quantity * product.price}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{
                    mt: 1,
                    "&:hover": { bgcolor: red[`A400`], color: "white" },
                  }}
                  size="small"
                  color="error"
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <LinearProgress color="success" />
      )}
    </Box>
  );
}

export default CartCard;
