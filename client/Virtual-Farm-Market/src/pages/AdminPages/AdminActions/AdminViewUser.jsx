import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


import { useDispatch } from "react-redux";


function AdminViewUser() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  
  return (
    <div>
     vireusers
    </div>
  );
}

export default AdminViewUser;
