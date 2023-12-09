import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { grey, red } from "@mui/material/colors";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";


const openTruncateStyle = {
  overflow: "hidden",
  textOverFlow: "ellipsis",
};
const truncateStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

function UserNotification({
  title,
  content,
  isRead,
  _id,
  handleClickNotificationRead,
  expandContentInNotification,
  handleDeleteNotification,
}) {
  return (
    <ListItem
      onClick={() =>
        expandContentInNotification === _id
          ? handleClickNotificationRead(null)
          : handleClickNotificationRead(_id)
      }
      sx={{
        my: 0.5,
        bgcolor: isRead ? grey[100] : grey[300],
        borderRadius: 2,
        "&:hover": { cursor: "pointer" },
      }}
      key={_id}
    >
      <ListItemText
        primary={
          <div>
            <>{isRead ? null : <MarkUnreadChatAltIcon color="primary" />}</>
            &nbsp;{title}
          </div>
        }
        secondary={
          <div
            style={
              expandContentInNotification === _id
                ? openTruncateStyle
                : truncateStyle
            }
          >
            {content}
          </div>
        }
      />
      <IconButton
        onClick={() => handleDeleteNotification(_id)}
        size="small"
        color="black"
        sx={{
          "&:hover": { bgcolor: red["A200"], color: "white" },
        }}
      >
        <DeleteOutlineIcon />
      </IconButton>
      <Divider />
    </ListItem>
  );
}

export default UserNotification;
