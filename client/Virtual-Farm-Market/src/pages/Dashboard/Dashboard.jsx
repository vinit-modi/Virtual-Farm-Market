import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD } from "../../Redux/Reducers/handlePasswordReducer";
import { toast } from "react-toastify";
import { CLEAR_MESSAGE_USERREDUCER } from "../../Redux/Reducers/userReducer";
import { GET_USER_PROFILE_IMAGE } from "../../Redux/Reducers/authReducer";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES_PRODUCT,
} from "../../Redux/Reducers/productReducer";
import { Box } from "@mui/material";
import UserProductCategoryTabs from "../../components/UserProductCategoryTabs/UserProductCategoryTabs";

function Dashboard() {
  const navigate = useNavigate();
  const setPassword = useSelector((state) => state.setPassword);
  const userDetails = useSelector((state) => state.userDetails);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_CATEGORIES_PRODUCT });
    dispatch({ type: GET_ALL_PRODUCTS });
  }, []);

  //Make it perfect
  useEffect(() => {
    if (setPassword?.message === `Password changed successfully`) {
      toast.success(setPassword.message);
      dispatch({
        type: CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD,
        payload: `message`,
      });
    }
  }, [setPassword?.message]);

  //Make it perfect
  useEffect(() => {
    if (userDetails.message) {
      toast.success(userDetails.message);
      dispatch({ type: GET_USER_PROFILE_IMAGE });
      dispatch({ type: CLEAR_MESSAGE_USERREDUCER });
    }
  }, [userDetails.message]);

  return (
    <>
      <Box>
        <UserProductCategoryTabs {...{ product }} />
      </Box>
    </>
  );
}

export default Dashboard;
