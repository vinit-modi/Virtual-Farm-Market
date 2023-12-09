import React, { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { GET_EDIT_CATEGORIES } from "../../Redux/Reducers/adminCategoriesReducer";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";

function UserActions({ paramFormattedValue, params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //   console.log(params);
  //   console.log(rowId);

  const dispatch = useDispatch();
  const adminCategories = useSelector((state) => state.adminCategoriesReducer);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (params.id === rowId) {
        const { _id, name, isActive } = params.row;
        dispatch({
          type: GET_EDIT_CATEGORIES,
          payload: { _id: _id, name: name },
        });
      }
      setRowId(null);
      setLoading(false);
    }, 1000);
  };

  useEffect(
    () => {
      // console.log("PARAMIDDD::", params);
      //     console.log("ROWID::", rowId);
      //     console.log("LOADING::", loading);
    },
    [
      // loading,
      // rowId,
      // params,
    ]
  );
  return (
    <div>
      <Box sx={{ m: 1, position: "relative" }}>
        {success ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
            }}
            disabled={
              !paramFormattedValue ? params.id !== rowId || loading : true
            }
            onClick={handleSubmit}
          >
            {loading ? <RunningWithErrorsIcon /> : <Save />}
          </Fab>
        )}
        {loading && (
          <CircularProgress
            size={52}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </div>
  );
}

export default UserActions;
