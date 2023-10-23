import React, { useEffect, useMemo, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORIES_CLEARE_MESSAGE,
  GET_ALL_CATEGORIES,
  GET_EDIT_STATUS_CATEGORIES,
} from "../../Redux/Reducers/adminCategoriesReducer";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography, gridClasses } from "@mui/material";
import moment from "moment";
import { grey } from "@mui/material/colors";
import UserActions from "../../components/DataGridEditButton/UserActions";
import { toast } from "react-toastify";

function AdminCategories() {
  const dispatch = useDispatch();
  const adminCategories = useSelector((state) => state.adminCategoriesReducer);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [paramFormattedValue, setParamFormattedValue] = useState();

  useEffect(() => {
    dispatch({ type: GET_ALL_CATEGORIES });
  }, [!adminCategories.allCategories]);

  useEffect(() => {
    if (adminCategories.allCategories) {
      setRows(adminCategories.allCategories);
    }
  }, [adminCategories.allCategories]);

  useEffect(() => {
    if (
      adminCategories.message &&
      adminCategories.message !== `All categories.`
    ) {
      toast.success(adminCategories.message);
      dispatch({ type: CATEGORIES_CLEARE_MESSAGE });
      dispatch({ type: GET_ALL_CATEGORIES });
    }
  }, [adminCategories.message]);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 300 },
      { field: "name", headerName: "Item Name", width: 200, editable: true },
      {
        field: "isActive",
        headerName: "Active",
        width: 100,
        type: "boolean",
        editable: true,
        renderCell: (param) => {
          if (rowId === param.id) {
            if (
              paramFormattedValue !== param.formattedValue &&
              paramFormattedValue
            ) {
              dispatch({
                type: GET_EDIT_STATUS_CATEGORIES,
                payload: { _id: rowId },
              });
              setParamFormattedValue(null);
              setRowId(null);
            }
          }
        },
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 300,
        renderCell: (param) =>
          moment(param.row.createdAt).format("HH:mm:ss || YYYY-MM-DD"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 100,
        type: "actions",
        renderCell: (params) => (
          <>
            <UserActions
              {...{ paramFormattedValue, params, rowId, setRowId }}
            />
          </>
        ),
      },
    ],
    [rowId]
  );

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <Typography component="h4" variant="h4">
          Categories
        </Typography>
        {adminCategories.loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            getRowSpacing={(param) => ({
              top: param.isFirstVisible ? 0 : 5,
              bottom: param.isLastVisible ? 0 : 5,
            })}
            onCellDoubleClick={(params) => {
              if (params.field === `isActive`) {
                setParamFormattedValue(params.formattedValue);
              }
              setRowId(params.id);
            }}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme?.palette?.mode === "light" ? grey[200] : grey[980],
              },
            }}

            // rowsPerPageOptions={[5, 10, 15]}
            // pageSize={pageSize}
            // onPageSizeChange={(newSelectedPageSize) => setPageSize(newSelectedPageSize)
          />
        )}
      </Box>
    </div>
  );
}

export default AdminCategories;
