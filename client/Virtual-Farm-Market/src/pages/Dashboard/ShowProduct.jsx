import {
  Box,
  ButtonGroup,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { Button } from "@mui/base";
import {
  CLEAR_PRODUCT_COUNT_TO_CART,
  GET_ADD_PRODUCT_TO_CART,
  GET_ALLPRODUCTS_CART,
  GET_REMOVE_PRODUCT_TO_CART,
} from "../../Redux/Reducers/cartReducer";
import { CLEAR_OBJECT_PRODUCT } from "../../Redux/Reducers/productReducer";
import EmptyFoodImage from "../../Assets/EmptyProduct/EmptyFoodImage.jpg";

function ShowProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.product);
  const { productObj } = product;
  const cart = useSelector((state) => state.cart);

  const [expanded, setExpanded] = useState(false);
  const [quntityCount, setQuntityCount] = useState();

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleCollapse = () => {
    setExpanded(false);
  };

  const truncateDescription = (text, limit) => {
    if (!text) {
      return "";
    }

    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (let i = 0; i < words.length; i++) {
      if ((line + words[i]).length <= 40) {
        line += ` ${words[i]}`;
      } else {
        lines.push(line.trim());
        line = ` ${words[i]}`;
      }
    }

    if (lines.length > limit) {
      return lines.slice(0, limit).join("\n");
    }
    return text;
  };

  const increment = () => {
    dispatch({
      type: GET_ADD_PRODUCT_TO_CART,
      payload: { _id: productObj._id },
    });
    dispatch({ type: GET_ALLPRODUCTS_CART });
    countQuntities();
  };

  const decrement = () => {
    dispatch({
      type: GET_REMOVE_PRODUCT_TO_CART,
      payload: { _id: productObj._id },
    });
    dispatch({ type: GET_ALLPRODUCTS_CART });
    countQuntities();
  };

  function countQuntities() {
    const quntity = cart.cartProductList.filter(
      (item) => item.product._id === product.productObj._id
    );
    setQuntityCount(quntity[0]?.quantity);
  }

  const handleAddToCart = () => {
    // dispatch({type:})
    dispatch({
      type: GET_ADD_PRODUCT_TO_CART,
      payload: { _id: productObj._id },
    });
  };

  useEffect(() => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
    countQuntities();
    return () => {
      dispatch({ type: CLEAR_OBJECT_PRODUCT });
      dispatch({ type: CLEAR_PRODUCT_COUNT_TO_CART });
    };
  }, []);

  useEffect(() => {
    countQuntities();
  }, [cart.cartProductList, product]);

  useEffect(() => {
    console.log(quntityCount);
  }, [quntityCount]);
  return (
    <>
      <Box>
        {!!productObj ? (
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Stack direction="column" spacing={2}>
              <Stack>
                <Paper elevation={3} sx={{ width: 400, height: 300, m: 4 }}>
                  <ReactImageMagnify
                    isHintEnabled={true}
                    {...{
                      smallImage: {
                        alt: "Small Image",
                        src:
                          (productObj.images && productObj.images[0]) ||
                          EmptyFoodImage,
                        width: 400,
                        height: 300,
                      },
                      largeImage: {
                        src:
                          (productObj.images && productObj.images[0]) ||
                          EmptyFoodImage,
                        width: 1200,
                        height: 900,
                      },
                      enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "150%",
                      },
                    }}
                  />
                </Paper>
              </Stack>
              <Stack>
                <div>More Images</div>
              </Stack>
            </Stack>

            <Stack>
              <Grid container mt={3} ml={2} direction={"column"} rowSpacing={2}>
                <Grid item>
                  <Typography variant="h4">{productObj.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" component="p">
                    Price:&nbsp;
                    <span style={{ fontSize: "1em" }}>$</span>
                    <span style={{ fontSize: "1.6em" }}>
                      {productObj.price}
                    </span>
                    {/* <sup style={{ position: 'relative' ,top: '-1em'}}>.99</sup> */}
                  </Typography>
                </Grid>{" "}
                <Grid>
                  <Typography
                    variant="body1"
                    component="p"
                    color={green["A700"]}
                  >
                    <span style={{ color: "black" }}>Total Price:&nbsp;</span>
                    <span style={{ fontSize: "1em" }}>$</span>

                    <span style={{ fontSize: "1.6em" }}>
                      {!(
                        productObj.price *
                        (cart.productQuantityCount
                          ? cart.productQuantityCount
                          : quntityCount)
                      )
                        ? 0
                        : productObj.price *
                          (cart.productQuantityCount
                            ? cart.productQuantityCount
                            : quntityCount)}
                    </span>
                  </Typography>
                </Grid>{" "}
                <Grid item>
                  <Box display="flex" alignItems="center">
                    <Button
                      className="btn btn-primary"
                      variant="contained"
                      onClick={decrement}
                    >
                      -
                    </Button>
                    <Typography
                      variant="body1"
                      sx={{
                        height: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 26,
                      }}
                      width={35}
                    >
                      {!(
                        productObj.price *
                        (cart.productQuantityCount
                          ? cart.productQuantityCount
                          : quntityCount)
                      )
                        ? 0
                        : cart.productQuantityCount
                        ? cart.productQuantityCount
                        : quntityCount}
                    </Typography>
                    <Button
                      className="btn btn-primary"
                      variant="contained"
                      onClick={increment}
                    >
                      +
                    </Button>
                  </Box>
                </Grid>
                <Grid item>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart()}
                  >
                    Add to Cart
                  </button>
                </Grid>
                <Grid item>
                  <Box sx={{ mr: 3 }}>
                    <Typography variant="body1">
                      <span style={{ fontSize: "1.3em" }}>
                        {" "}
                        Description:&nbsp;
                      </span>
                      {expanded
                        ? productObj.description
                        : truncateDescription(productObj.description, 3)}
                      {!expanded &&
                        truncateDescription(productObj.description, 3).split(
                          "\n"
                        ).length > 3 && (
                          <span
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={handleToggleExpand}
                          >
                            ... Read more
                          </span>
                        )}
                      {expanded && (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={handleToggleCollapse}
                        >
                          &nbsp;Read less
                        </span>
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        ) : (
          <LinearProgress color="success" />
        )}
      </Box>
    </>
  );
}

export default ShowProduct;
