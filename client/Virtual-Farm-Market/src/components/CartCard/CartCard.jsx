import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART_LIST_CART,
  GET_ADD_PRODUCT_TO_CART,
  GET_ALLPRODUCTS_CART,
  GET_CART_ITEM_COUNT_CART,
  GET_REMOVE_PRODUCT_CART,
  GET_REMOVE_PRODUCT_TO_CART,
} from "../../Redux/Reducers/cartReducer";
import { useEffect } from "react";
import { GET_OBJECT_PRODUCT } from "../../Redux/Reducers/productReducer";

function CartCard({ item, totalBillAmount }) {
  const { product, seller } = item;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
  }, []);

  const handleAddQuantity = () => {
    dispatch({ type: GET_ADD_PRODUCT_TO_CART, payload: { _id: product._id } });
    dispatch({ type: CLEAR_CART_LIST_CART });

    setTimeout(() => {
      dispatch({ type: GET_ALLPRODUCTS_CART });
    }, 10);
  };

  const handleRemoveQuantity = () => {
    dispatch({
      type: GET_REMOVE_PRODUCT_TO_CART,
      payload: { _id: product._id },
    });
    dispatch({ type: CLEAR_CART_LIST_CART });
    setTimeout(() => {
      dispatch({ type: GET_ALLPRODUCTS_CART });
      dispatch({ type: GET_OBJECT_PRODUCT, payload: { _id: product._id } });
    }, 10);
  };

  const handleRemoveCart = () => {
    dispatch({ type: GET_REMOVE_PRODUCT_CART, payload: { _id: item._id } });
    setTimeout(() => {
      dispatch({ type: GET_ALLPRODUCTS_CART });
    }, 10);
    dispatch({ type: CLEAR_CART_LIST_CART });

    dispatch({ type: GET_CART_ITEM_COUNT_CART });
  };

  useEffect(() => {
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
  }, [cart.message, product.message]);

  useEffect(() => {
    totalBillAmount();
  }, [item.quantity, product.price]);

  return (
    <Box sx={{ borderBottom: "1px solid #ccc", padding: 2 }}>
      {item ? (
        <Grid container spacing={3} alignItems="center">
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
                  {item.quantity === 1 ? (
                    <Button
                      onClick={() => handleRemoveCart()}
                      variant="outlined"
                      sx={{
                        border: "none",
                        color: "red",
                        "&:hover": {
                          bgcolor: red[500],
                          color: "white",
                          border: "none",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : (
                    <Button onClick={() => handleRemoveQuantity()}>-</Button>
                  )}
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
                {product.price && (
                  <>
                    <Typography>
                      Price:&nbsp;{product.price.toFixed(2)}
                    </Typography>
                    <Typography>
                      Total:&nbsp;{(item.quantity * product.price).toFixed(2)}
                    </Typography>
                  </>
                )}
                <Button
                  onClick={() => handleRemoveCart()}
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
