import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { Box, Button } from "@mui/material";

import EmptyFoodImage from "../../Assets/EmptyProduct/EmptyFoodImage.jpg";
import { useDispatch } from "react-redux";
import { GET_OBJECT_PRODUCT } from "../../Redux/Reducers/productReducer";
import { useNavigate } from "react-router-dom";
import {
  GET_ADD_PRODUCT_TO_CART,
  GET_CART_ITEM_COUNT_CART,
} from "../../Redux/Reducers/cartReducer";
import { green } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductCard({ item }) {
  const grey = {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleProductShow(id) {
    console.log(id);
    dispatch({ type: GET_OBJECT_PRODUCT, payload: { _id: id } });
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
    navigate(`/user/showproduct`);
  }

  function handleAddToCart(id) {
    dispatch({
      type: GET_ADD_PRODUCT_TO_CART,
      payload: { _id: id },
    });
    setTimeout(() => {
      dispatch({ type: GET_CART_ITEM_COUNT_CART });
    }, 10);
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,

          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box onClick={() => handleProductShow(item._id)}>
          {item.seller ? (
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label={item.seller.name}
                  src={item.seller.profilePicture}
                />
              }
              title={item.seller.name}
              subheader={`${item.seller.city}, ${item.seller.province}`}
            />
          ) : (
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="Empty" />}
              title="Empty"
              subheader="Empty"
            />
          )}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image={item.images.length > 0 ? item.images[0] : EmptyFoodImage}
              alt={item.name}
              sx={{
                borderRadius: 3,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                p: 0.2,
              }}
            />
          </Box>
          <CardContent>
            <Typography
              variant="h5"
              // color={grey[800]}
            >
              {item.name}
            </Typography>
            <Typography
              variant="body1"
              //      color={grey[700]}
            >
              Price: {item.price}
            </Typography>

            <Typography>
              Available at:&nbsp;
              <span>{item.city}</span>
            </Typography>
          </CardContent>
        </Box>

        <CardActions
          disableSpacing
          sx={{
            // bgcolor: green[500],
            // bgcolor: "#7e57c2",

            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="error" />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon color="primary" />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled={!(item.quantityAvailable > 0)}
              sx={{
                bgcolor: green[600],
                "&:hover": { bgcolor: green[400] },
              }}
              onClick={() => {
                handleAddToCart(item._id);
              }}
              startIcon={item.quantityAvailable > 0 && <AddShoppingCartIcon />}
            >
              {item.quantityAvailable > 0 ? `ADD TO CART` : `OUT OF STOCK`}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
