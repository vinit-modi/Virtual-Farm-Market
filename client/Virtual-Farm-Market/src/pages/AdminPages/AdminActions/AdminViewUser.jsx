import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { GET_ADMIN_USER_EDIT_OBJECT } from "../../../Redux/Reducers/adminReducer";

function AdminViewUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const adminReducer = useSelector((state) => state.adminReducer);
  const data = adminReducer?.userObjForEdit;

  useEffect(() => {
    if (
      !adminReducer.userObjForEdit ||
      adminReducer.userObjForEdit._id !== id
    ) {
      console.log("COMING");
      dispatch({ type: GET_ADMIN_USER_EDIT_OBJECT, payload: { _id: id } });
    }
  }, [id, adminReducer.userObjForEdit]);

  return (
    <div>
      {!adminReducer.userObjForEdit ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.name}
            </Typography>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Email: {data.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone Number: {data.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                City: {data.city}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Province: {data.province}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AdminViewUser;
