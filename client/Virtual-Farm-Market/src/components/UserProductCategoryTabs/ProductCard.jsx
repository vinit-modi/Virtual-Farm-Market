import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import { Box, Button } from "@mui/material";
import { orange } from "@mui/material/colors";
import EmptyFoodImage from "../../Assets/EmptyProduct/EmptyFoodImage.jpg";

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

  return (
    <>
      <Card sx={{ maxWidth: 345, bgcolor: grey[100] }}>
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
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              p: 0.2,
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h5" color={grey[800]}>
            {item.name}
          </Typography>
          <Typography variant="body1" color={grey[700]}>
            Price: {item.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              pt: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.description}
          </Typography>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{
            bgcolor: grey[200],
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Box>
            <Button
              variant="contained"
              disabled={!(item.quantityAvailable > 0)}
              sx={{
                bgcolor: orange[`A700`],
                "&:hover": { bgcolor: orange[`A400`] },
              }}
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