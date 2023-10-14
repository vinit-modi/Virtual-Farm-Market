import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_MESSAGE_ADMIN,
  GET_ADMINSIDE_USER_LIST,
  GET_ADMIN_USER_DELETE_REQUEST,
} from "../../Redux/Reducers/adminReducer";
import { useEffect } from "react";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sort, setSort] = React.useState("name");
  const [order, setOrder] = React.useState("asc");
  const [isCheck, setIsCheck] = React.useState(false);
  const [payloadObj, setPayloadObj] = React.useState({
    page: 1,
    limit: 10,
    sortField: "name",
    sortOrder: "asc",
    search: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminReducer = useSelector((state) => state.adminReducer);

  // const updatePayloadObj = () => {
  //   setPayloadObj({
  //     page: page + 1,
  //     limit: rowsPerPage,
  //     sortField: sort,
  //     sortOrder: order,
  //     search: "",
  //   });
  // };

  const prevPayloadObj = React.useRef(payloadObj);

  React.useEffect(() => {
    if (payloadObj !== prevPayloadObj.current) {
      console.log(payloadObj);
      dispatch({ type: GET_ADMINSIDE_USER_LIST, payload: payloadObj });
      prevPayloadObj.current = payloadObj;
    }
  }, [payloadObj]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage + 1);
    setPage(newPage);
    setPayloadObj((prevPayloadObj) => ({
      ...prevPayloadObj,
      page: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    console.log(+event.target.value);
    setPayloadObj((prevPayloadObj) => ({
      ...prevPayloadObj,
      page: 1,
      limit: +event.target.value,
    }));
  };

  React.useEffect(() => {
    if (!adminReducer.userList)
      dispatch({ type: GET_ADMINSIDE_USER_LIST, payload: payloadObj });
  }, []);

  const handleEditClick = (userId) => {
    console.log(userId);
    navigate(`/admin/action/edit/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    console.log(userId);
    dispatch({ type: GET_ADMIN_USER_DELETE_REQUEST, payload: { _id: userId } });
    // navigate(`/admin/action/delete/${userId}`);
  };

  const handleViewClick = (userId) => {
    console.log(userId);
    navigate(`/admin/action/view/${userId}`);
  };

  useEffect(() => {
    if (adminReducer.message === `User deleted successfully.`) {
      //Toast
      dispatch({ type: CLEAR_MESSAGE_ADMIN });
    }
  }, [adminReducer.message]);

  return (
    <div>
      <h1>Active User List</h1>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              {adminReducer.userList &&
                adminReducer.userList
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
                        <TableCell>
                          <button onClick={() => handleEditClick(row._id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteClick(row._id)}>
                            Delete
                          </button>
                          <button onClick={() => handleViewClick(row._id)}>
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={adminReducer.userList ? adminReducer.userList.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default AdminUserList;
