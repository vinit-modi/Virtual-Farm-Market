import React, { useEffect, useState } from "react";
import "./OrderCard.css";
import Typography from "@mui/material/Typography";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function OrderCard({ order }) {
  const date = new Date(order.createdAt);
  const [orederTime, setOrderTime] = useState();

  useEffect(() => {
    const formattedTime = date.toLocaleDateString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    setOrderTime(formattedTime);
  }, []);

  const handleCopy = () => {
    const el = document.createElement("textarea");
    el.value = `ORDER ID - ${order.orderNumber}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div>
      <div className="courses-container">
        <div className="course">
          <div className="course-preview">
            <Box
              sx={{
                height: 140,
                width: 140,
                position: "relative",
                overflow: "hidden",
                borderRadius:2
              }}
            >
              <img
                alt={order.products.name}
                src={order.products.images[0]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </Box>
          </div>
          <div className="course-info">
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Stack>
                {" "}
                <Box display="flex" alignItems="center">
                  <h6>
                    <Typography
                      onClick={handleCopy}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    >
                      ORDER ID - {order.orderNumber}
                    </Typography>
                  </h6>
                  <IconButton
                    aria-label="copy"
                    onClick={handleCopy}
                    style={{ cursor: "pointer" }}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Box>
                <Typography variant="h4">{order.products.name}</Typography>
                <Typography sx={{ fontSize: 20 }}>
                  Quantity: {order.products.quantity}
                </Typography>
                <Typography sx={{ fontSize: 20 }}>
                  Price: {order.products.price}
                </Typography>
                <br />
                <Typography variant="body1">
                  Order Time: {orederTime}
                </Typography>
              </Stack>
              <Stack>
                <Tooltip title="Status">
                  <Typography
                    variant="body1"
                    sx={
                      order.orderStatus &&
                      order.orderStatus.toUpperCase() === "DELIVERED"
                        ? {
                            color: green["A700"],
                            fontWeight: "bold",
                          }
                        : {
                            color: orange[800],
                            fontWeight: "bold",
                          }
                    }
                  >
                    {order.orderStatus.toUpperCase()}
                  </Typography>
                </Tooltip>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>

      {/* <button className="floating-btn">Get in Touch</button> */}
    </div>
  );
}

export default OrderCard;
