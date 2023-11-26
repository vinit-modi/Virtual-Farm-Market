import { Button, Tooltip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function DefaultButton() {
  return (
    <div>
      <Tooltip title="Default Card">
        <Button
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          sx={{
            "&:hover": {
              cursor: "default",
            },
          }}
          startIcon={
            <BookmarkIcon
              sx={{
                color: green["A700"],
              }}
            />
          }
        >
          <Typography>Default</Typography>
        </Button>
      </Tooltip>
    </div>
  );
}

export default DefaultButton;
