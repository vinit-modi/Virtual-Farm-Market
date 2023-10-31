import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_MESSAGE_ADMIN } from "../../Redux/Reducers/adminReducer";

function AdminDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: CLEAR_MESSAGE_ADMIN})
  }, []);

  return <div>dashboard</div>;
}

export default AdminDashboard;
