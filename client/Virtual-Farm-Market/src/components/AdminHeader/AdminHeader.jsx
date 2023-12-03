import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PolicyIcon from "@mui/icons-material/Policy";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE_ADMIN,
  GET_ADMIN_PROFILE_DATA,
  SET_ADMIN_LOGOUT,
  adminReducer,
} from "../../Redux/Reducers/adminReducer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdminProtectedRoute from "../../auth/authAdmin/AdminProtectedRoute";
import AdminUserList from "../../pages/AdminPages/AdminUserList";
import AdminCategories from "../../pages/AdminPages/AdminCategories";
import AdminPrivacyPolicy from "../../pages/AdminPages/AdminPrivacyPolicy";
import AdminTermsAndCondition from "../../pages/AdminPages/AdminTermsAndCondition";
import AdminProfileEdit from "../../pages/AdminPages/HandleAdmin/AdminProfileEdit";
import AdminChangePassword from "../../pages/AdminPages/HandleAdmin/AdminChangePassword";
import { useEffect } from "react";
import AdminEditUser from "../../pages/AdminPages/AdminActions/AdminEditUser";
import AdminViewUser from "../../pages/AdminPages/AdminActions/AdminViewUser";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import QuizIcon from "@mui/icons-material/Quiz";
import AdminFaqs from "../../pages/AdminPages/AdminFaqs";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";

const icons = [<RecentActorsIcon />, <AccountCircleIcon />, <QuizIcon />];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminHeader() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDD, setOpenDD] = React.useState(false);

  const handleClick = () => {
    setOpenDD(!openDD);
  };

  const dispatch = useDispatch();
  const adminReducer = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenDD(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch({ type: SET_ADMIN_LOGOUT });
  };

  const handleProfileEdit = () => {
    dispatch({
      type: GET_ADMIN_PROFILE_DATA,
      payload: { _id: adminReducer.adminId },
    });
    navigate("/admin/profileedit");
    setAnchorEl(null);
  };

  const handleChangePassword = () => {
    navigate("/admin/changepassword");
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (adminReducer.message === `Admin profile updated successfully`) {
      //Toast

      dispatch({ type: CLEAR_MESSAGE_ADMIN });
    }
  }, [adminReducer.message]);

  useEffect(() => {
    if (adminReducer.message === ``) {
      //Toast
      dispatch({ type: CLEAR_MESSAGE_ADMIN });
    }
  }, [adminReducer.message]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ float: "left", width: "100%" }}
          >
            Admin Panel
          </Typography>
          <div>
            <div>
              {adminReducer.adminId && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfileEdit}>
                      Profile Edit
                    </MenuItem>
                    <MenuItem onClick={handleChangePassword}>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["User list", "Categories", "FAQs"].map((text, index) => {
            let urlPath;
            if (text === `User list`) urlPath = `user`;
            else if (text === `Categories`) urlPath = `categories`;
            else if (text === `FAQs`) urlPath = `faqs`;
            return (
              <ListItem
                key={text}
                onClick={() => navigate(`/admin/${urlPath}`)}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={handleClick}
              sx={{
                minHeight: 48,
                justifyContent: openDD ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InboxIcon />
              </ListItemIcon>
              {open && (
                <>
                  <ListItemText primary="CMS" />
                  {openDD ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
            <Collapse in={openDD} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`/admin/privacypolicy`)}
                >
                  <ListItemIcon>
                    <PolicyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Privacy Policy" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => navigate(`/admin/termsandconditions`)}
                >
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Terms & Conditions" />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {adminReducer.loading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Routes>
            <Route
              exact
              path="profileedit"
              element={
                <AdminProtectedRoute>
                  <AdminProfileEdit />
                </AdminProtectedRoute>
              }
            />
            <Route
              exact
              path="changepassword"
              element={
                <AdminProtectedRoute>
                  <AdminChangePassword />
                </AdminProtectedRoute>
              }
            />
            <Route
              exact
              path="user"
              element={
                <AdminProtectedRoute>
                  <AdminUserList />
                </AdminProtectedRoute>
              }
            />
            <Route
              exact
              path="categories"
              element={
                <AdminProtectedRoute>
                  <AdminCategories />
                </AdminProtectedRoute>
              }
            />

            <Route
              exact
              path="privacypolicy"
              element={
                <AdminProtectedRoute>
                  <AdminPrivacyPolicy />
                </AdminProtectedRoute>
              }
            />
            <Route
              exact
              path="termsandconditions"
              element={
                <AdminProtectedRoute>
                  <AdminTermsAndCondition />
                </AdminProtectedRoute>
              }
            />
            <Route
              exact
              path="faqs"
              element={
                <AdminProtectedRoute>
                  <AdminFaqs />
                </AdminProtectedRoute>
              }
            />

            {/* CRUD FOR USERLIST */}
            <Route
              exact
              path="action/edit/:id"
              element={
                <AdminProtectedRoute>
                  <AdminEditUser />
                </AdminProtectedRoute>
              }
            />

            <Route
              exact
              path="action/view/:id"
              element={
                <AdminProtectedRoute>
                  <AdminViewUser />
                </AdminProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </Box>
    </Box>
  );
}
