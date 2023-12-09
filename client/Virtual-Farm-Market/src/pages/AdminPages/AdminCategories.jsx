import React, { useEffect, useMemo, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORIES_CLEARE_ERROR,
  CATEGORIES_CLEARE_MESSAGE,
  GET_ADD_CATEGORIES,
  GET_ALL_CATEGORIES,
  GET_DELETE_CATEGORIES,
  GET_EDIT_STATUS_CATEGORIES,
} from "../../Redux/Reducers/adminCategoriesReducer";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Fab,
  Button,
  Paper,
  TextField,
  Typography,
  gridClasses,
} from "@mui/material";
import moment from "moment";
import { grey, red } from "@mui/material/colors";
import UserActions from "../../components/DataGridEditButton/UserActions";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";

function AdminCategories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminCategories = useSelector((state) => state.adminCategoriesReducer);
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [paramFormattedValue, setParamFormattedValue] = useState();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [addCategoryInput, setAddCategoryInput] = useState();

  const handleAddCategoryInput = (e) => {
    setAddCategoryInput(e.target.value);
  };

  const handleAddCategories = () => {
    setShowAddCategory(!showAddCategory);
  };

  const submitAddCategory = (e) => {
    e.preventDefault();
    dispatch({ type: GET_ADD_CATEGORIES, payload: { name: addCategoryInput } });
    setAddCategoryInput("");
    setShowAddCategory(false);
  };

  useEffect(() => {
    if (!adminCategories.allCategories) {
      dispatch({ type: GET_ALL_CATEGORIES });
    }
  }, [!adminCategories.allCategories]);

  useEffect(() => {
    if (adminCategories.allCategories) {
      setRows(adminCategories.allCategories);
    }
  }, [adminCategories.allCategories]);

  useEffect(() => {
    if (adminCategories.error) {
      toast.error(adminCategories.error);
      dispatch({ type: CATEGORIES_CLEARE_ERROR });
    }
  }, [adminCategories.error]);

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
      // {
      //   field: "_id",
      //   headerName: "ID",
      //   sortable: false,
      //   width: 300,
      // },
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
        width: 200,
        renderCell: (param) =>
          moment(param.row.createdAt).format("HH:mm:ss || YYYY-MM-DD"),
      },
      {
        field: "actions",
        headerName: "Edit",
        width: 100,
        type: "actions",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <UserActions
              {...{ paramFormattedValue, params, rowId, setRowId }}
            />
          </>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        type: "delete",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <Fab
              elevation={0}
              sx={{
                height: 40,
                width: 40,
                "&:hover": { bgcolor: red[700], color: "white" },
              }}
            >
              <DeleteOutlineIcon
                onClick={() => {
                  dispatch({
                    type: GET_DELETE_CATEGORIES,
                    payload: { _id: params.id },
                  });
                }}
              />
            </Fab>
          </>
        ),
      },
    ],
    [rowId, paramFormattedValue]
  );

  return (
    <div>
      {adminCategories.loading ? null : (
        <Box sx={{ width: "100%" }}>
          <div>
            <Typography component="h4" variant="h4">
              Categories
            </Typography>
            <Paper
              elevation={1}
              className="d-flex justify-content-end mb-3 "
              sx={{ maxHeight: 100, minHeight: 50 }}
            >
              {showAddCategory && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    width: "100%",
                    m: 1,
                  }}
                >
                  <TextField
                    variant="outlined"
                    label="Add New Category"
                    value={addCategoryInput}
                    onChange={handleAddCategoryInput}
                    autoComplete="off"
                    autoFocus
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    className="ms-2"
                    color="primary"
                    type="submit"
                    onClick={submitAddCategory}
                  >
                    Add Item
                  </Button>
                </Box>
              )}
              <Button
                variant="contained"
                className="me-3 my-1 btn btn-primary"
                style={{ width: 200 }}
                onClick={handleAddCategories}
                disableElevation
              >
                {!showAddCategory ? <AddIcon /> : <RemoveIcon />}
                Add Category
              </Button>
            </Paper>
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              rowsPerPageOptions={[5, 10, 15]}
              pageSize={pageSize}
              onPageSizeChange={(newSelectedPageSize) =>
                setPageSize(newSelectedPageSize)
              }
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default AdminCategories;
