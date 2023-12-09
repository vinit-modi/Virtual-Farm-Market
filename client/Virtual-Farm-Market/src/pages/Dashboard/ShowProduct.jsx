import {
  Avatar,
  Box,
  Button,
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
import { green, red } from "@mui/material/colors";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  CLEAR_PRODUCT_COUNT_TO_CART,
  GET_ADD_PRODUCT_TO_CART,
  GET_ALLPRODUCTS_CART,
  GET_CART_ITEM_COUNT_CART,
  GET_REMOVE_PRODUCT_CART,
  GET_REMOVE_PRODUCT_TO_CART,
} from "../../Redux/Reducers/cartReducer";
import EmptyFoodImage from "../../Assets/EmptyProduct/EmptyFoodImage.jpg";
import { CheckCircle } from "@mui/icons-material";

function ShowProduct({ totalBillAmount }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.product);
  const { productObj } = product;
  const cart = useSelector((state) => state.cart);

  const [expanded, setExpanded] = useState(false);
  const [quntityCount, setQuntityCount] = useState();
  const [selectImage, setSelectImage] = useState(null);

  const images = product.productObj?.images;
  const displayImages = images && images.length > 0 ? images.slice(0, 4) : [];
  const remainingImages = images && images.length > 4 ? images.slice(4) : [];

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
      if ((line + words[i]).length <= 120) {
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
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
    totalBillAmount();
  };

  const decrement = () => {
    dispatch({
      type: GET_REMOVE_PRODUCT_TO_CART,
      payload: { _id: productObj._id },
    });
    dispatch({ type: GET_ALLPRODUCTS_CART });
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
    totalBillAmount();
  };

  function countQuntities() {
    const quntity = cart.cartProductList
      ? cart.cartProductList.filter(
          (item) => item.product._id === product.productObj._id
        )
      : [];
    setQuntityCount(quntity[0]?.quantity);
  }

  const handleAddToCart = () => {
    dispatch({
      type: GET_ADD_PRODUCT_TO_CART,
      payload: { _id: productObj._id },
    });
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
    totalBillAmount();
  };

  useEffect(() => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
    // dispatch({ type: GET_CART_ITEM_COUNT_CART });
    countQuntities();
    totalBillAmount();
    return () => {
      //   dispatch({ type: CLEAR_OBJECT_PRODUCT });
      dispatch({ type: CLEAR_PRODUCT_COUNT_TO_CART });
    };
  }, []);

  useEffect(() => {
    // dispatch({ type: GET_ALLPRODUCTS_CART });

    countQuntities();
    totalBillAmount();
  }, [cart.cartProductList, product]);

  useEffect(() => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
  }, [quntityCount]);

  const handleRemoveProductInCart = () => {
    dispatch({ type: CLEAR_PRODUCT_COUNT_TO_CART });

    dispatch({ type: GET_ALLPRODUCTS_CART });
    const cartProductIdOnShownProduct = cart.cartProductList.filter((item) => {
      return productObj._id === item.product._id;
    });
    console.log(cartProductIdOnShownProduct[0]._id);

    dispatch({
      type: GET_REMOVE_PRODUCT_CART,
      payload: { _id: cartProductIdOnShownProduct[0]._id },
    });
    totalBillAmount();
    // dispatch({ type: GET_ALLPRODUCTS_CART });
  };

  return (
    <>
      <Box>
        {!!productObj ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Stack direction="column" spacing={2}>
              <Stack>
                <Paper elevation={3} sx={{ width: 400, height: 300, m: 4 }}>
                  <ReactImageMagnify
                    isHintEnabled={true}
                    enlargedImageContainerStyle={{
                      zIndex: 9999,
                      overflow: "hidden",
                    }}
                    enlargedImagePosition="over"
                    {...{
                      smallImage: {
                        alt: "Small Image",
                        src:
                          selectImage ||
                          (productObj.images && productObj.images[0]) ||
                          EmptyFoodImage,
                        width: 400,
                        height: 300,
                      },
                      largeImage: {
                        src:
                          selectImage ||
                          (productObj.images && productObj.images[0]) ||
                          EmptyFoodImage,
                        width: 1200,
                        height: 900,
                      },
                      enlargedImageContainerDimensions: {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  />
                </Paper>
              </Stack>

              {/* //More Images */}
              <Stack direction="row" spacing={1} sx={{ px: 3 }}>
                <Paper elevation={3} bgcolor="#cfd8dc">
                  <Stack direction="row" spacing={1} sx={{ px: 2 }}>
                    {displayImages.length &&
                      displayImages.map((image, index) => (
                        <Avatar
                          variant="rounded"
                          key={index}
                          alt={`Image ${index}`}
                          src={image}
                          sx={{
                            width: 48,
                            height: 48,
                            border: selectImage
                              ? `2px solid ${
                                  selectImage === image ? `#4fc3f7` : `none`
                                }`
                              : displayImages[0] === image
                              ? `#4fc3f7`
                              : `none`,
                          }}
                          onClick={() => setSelectImage(image)}
                        />
                      ))}
                    {remainingImages.length > 0 && (
                      <Avatar
                        variant="rounded"
                        alt={`+${remainingImages.length}`}
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "grey",
                          fontSize: 20,
                        }}
                      >
                        +{remainingImages.length}
                      </Avatar>
                    )}
                  </Stack>
                </Paper>
              </Stack>

              {/* 100% satisfaction guarantee */}
              <Stack sx={{ pt: 5 }}>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box>
                    <strong>
                      <CheckCircle color="primary" fontSize="small" />
                      <u>100% satisfaction guarantee</u>
                    </strong>
                    <Typography>
                      Place your order with peace of mind.
                    </Typography>
                  </Box>
                </Typography>
              </Stack>
            </Stack>

            {/* All Details */}
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
                      {Math.floor(productObj.price)}
                    </span>
                    <sup style={{ position: "relative", top: "-1em" }}>
                      {((productObj.price % 1) * 100).toFixed(0)}
                    </sup>
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
                        : Math.floor(
                            productObj.price *
                              (cart.productQuantityCount
                                ? cart.productQuantityCount
                                : quntityCount)
                          )}
                    </span>
                    <sup style={{ position: "relative", top: "-1em" }}>
                      {(
                        (((cart.productQuantityCount
                          ? cart.productQuantityCount
                          : quntityCount) *
                          productObj.price) %
                          1) *
                        100
                      ).toFixed(0)}
                    </sup>
                  </Typography>
                </Grid>{" "}
                <Grid item>
                  <Box display="flex" alignItems="center">
                    {
                      //  cart.productQuantityCount && cart.productQuantityCount === 1 ?

                      (!(
                        productObj.price *
                        (cart.productQuantityCount
                          ? cart.productQuantityCount
                          : quntityCount)
                      )
                        ? 0
                        : cart.productQuantityCount
                        ? cart.productQuantityCount
                        : quntityCount) &&
                      (!(
                        productObj.price *
                        (cart.productQuantityCount
                          ? cart.productQuantityCount
                          : quntityCount)
                      )
                        ? 0
                        : cart.productQuantityCount
                        ? cart.productQuantityCount
                        : quntityCount) === 1 ? (
                        <Button
                          className="btn btn-primary"
                          variant="outlined"
                          onClick={() => handleRemoveProductInCart()}
                          sx={{
                            border: "1px solid red",
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
                        <Button
                          className="btn btn-primary"
                          variant="contained"
                          onClick={decrement}
                          disabled={
                            // !cart.productQuantityCount
                            !(!(
                              productObj.price *
                              (cart.productQuantityCount
                                ? cart.productQuantityCount
                                : quntityCount)
                            )
                              ? 0
                              : cart.productQuantityCount
                              ? cart.productQuantityCount
                              : quntityCount)
                          }
                        >
                          -
                        </Button>
                      )
                    }

                    <Typography
                      variant="body1"
                      sx={{
                        height: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 26,
                      }}
                      width={55}
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
                {/* <Grid item>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart()}
                  >
                    Add to Cart
                  </button>
                </Grid> */}
                <Grid item>
                  <Typography variant="h6">
                    Country of Origin: CANADA
                  </Typography>
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
                <Grid item>
                  {Object.keys(product.productObj).length === 0 ? null : (
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Avatar
                          sx={{ width: 42, height: 42, bgcolor: green[500] }}
                          src={
                            product.productObj.seller &&
                            product.productObj.seller.profilePicture
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Farmer:</strong>&nbsp;
                          {product.productObj.seller
                            ? product.productObj.seller.name
                            : "Empty"}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Location:</strong>
                          &nbsp;
                          {product.productObj.seller
                            ? `${product.productObj.seller.city}, ${product.productObj.seller.province}`
                            : "Empty"}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
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
