import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_MESSAGE_ADMIN,
  GET_ADMINSIDE_USER_LIST,
  GET_ADMIN_USER_DELETE_REQUEST,
} from "../../Redux/Reducers/adminReducer";
import { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { useState } from "react";
import { toast } from "react-toastify";

const columns = [
  { id: "name", label: "Name", minWidth: 170, align: "center" },
  { id: "email", label: "Email", minWidth: 100, align: "center" },
  { id: "phoneNumber", label: "Phone Number", minWidth: 100 },
  {
    id: "city",
    label: "City",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "province",
    label: "Province",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function AdminUserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminReducer = useSelector((state) => state.adminReducer);

  //PAGINATION

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sort, setSort] = React.useState("name");
  const [order, setOrder] = React.useState("asc");
  const [isCheck, setIsCheck] = React.useState(false);
  const [selectRowLimit, setSelectRowLimit] = React.useState(5);
  const [search, setSearch] = useState({ searchInput: "" });
  const [userLists, setUserLists] = useState(adminReducer.userList | []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = selectRowLimit;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = userLists && userLists.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userLists?.length / recordPerPage);
  const numbers = [];
  for (let i = 1; i <= npage; i++) {
    numbers.push(i);
  }
  React.useEffect(() => {
    if (!userLists && !adminReducer.userList) {
      dispatch({
        type: GET_ADMINSIDE_USER_LIST,
      });
    }
  }, []);

  useEffect(() => {
    const filteredUserList =
      adminReducer.userList &&
      adminReducer.userList.filter((item) =>
        item.name.toLowerCase().includes(search.searchInput.toLowerCase())
      );
    setUserLists(filteredUserList);
  }, [search]);

  useEffect(() => {
    if (adminReducer.message) {
      toast.success(adminReducer.message);
      dispatch({ type: CLEAR_MESSAGE_ADMIN });
      dispatch({
        type: GET_ADMINSIDE_USER_LIST,
      });
    }
  }, [adminReducer.message]);

  const handleEditClick = (userId) => {
    console.log(userId);
    navigate(`/admin/action/edit/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    console.log(userId);
    dispatch({ type: GET_ADMIN_USER_DELETE_REQUEST, payload: { _id: userId } });
  };

  const handleViewClick = (userId) => {
    console.log(userId);
    navigate(`/admin/action/view/${userId}`);
  };

  const handleSearchField = (e) => {
    setSearch({
      searchInput: e.target.value,
    });
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <h1>Active User List</h1>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          autoComplete="off"
          className="d-flex justify-context-right"
          label="Search by Name..."
          variant="filled"
          type="text"
          name="searchInput"
          onChange={(e) => handleSearchField(e)}
          value={search.searchInput}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}{" "}
                <TableCell className="d-flex justify-content-center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell className="d-flex justify-content-center">
                          <ButtonGroup
                            size="large"
                            aria-label="large button group"
                          >
                            <Button
                              color="success"
                              // variant="contained"
                              key="edit"
                              onClick={() => handleEditClick(row._id)}
                            >
                              {<BorderColorIcon fontSize="small" />}Edit
                            </Button>
                            <Button
                              color="error"
                              // variant="contained"
                              key="delete"
                              onClick={() => handleDeleteClick(row._id)}
                            >
                              {" "}
                              {<DeleteIcon fontSize="small" />} Delete
                            </Button>
                            <Button
                              variant="contained"
                              // disableElevation
                              key="view"
                              onClick={() => handleViewClick(row._id)}
                            >
                              {" "}
                              {<WysiwygIcon fontSize="small" />} View
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          className="m-3"
        >
          <Stack direction="row">
            <InputLabel id="selectRow" className="d-flex align-items-center">
              Select Row limit: &nbsp;
            </InputLabel>
            <Select
              sx={{ minWidth: 70, maxWidth: 80, maxHeight: 40 }}
              size="small"
              labelId="selectRow"
              value={selectRowLimit}
              onChange={(e) => setSelectRowLimit(e.target.value)}
            >
              <MenuItem value={5}>5</MenuItem>

              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </Stack>
          <Stack>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    tabindex="-1"
                    onClick={prePage}
                  >
                    Previous
                  </a>
                </li>

                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? `active` : ``}`}
                    key={i}
                  >
                    <a
                      onClick={() => changeCPage(n)}
                      className="page-link"
                      href="#"
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#" onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}

export default AdminUserList;
