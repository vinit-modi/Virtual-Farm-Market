import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChangePassword from "../../pages/Authentication/ChangePassword";
import UpdateUserProfile from "../../pages/UpdateProfile/UpdateUserProfile";
import FaqsUser from "../../pages/Faqs/FaqsUser";
import TermsAndConditions from "../../pages/Cms/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../../pages/Cms/PrivacyPolicy/PrivacyPolicy";
import ProtectedRoute from "../../auth/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_AUTH_LOGOUT,
  GET_USER_PROFILE_IMAGE,
} from "../../Redux/Reducers/authReducer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, LinearProgress, List, Popover, Stack } from "@mui/material";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { green, grey, red } from "@mui/material/colors";
import Payment from "../../pages/Payment/Payment";
import { useEffect } from "react";
import {
  CLEAR_MESSAGE_NOTI,
  GET_ALL_DELETE_NOTI,
  GET_ALL_NOTI,
  GET_COUNT_OF_NOTI,
  GET_DELETE_NOTI,
  GET_OBJ_NOTI,
} from "../../Redux/Reducers/userNotificationReducer";
import UserNotification from "../UserNotification/UserNotification";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import axios from "axios";
import { useState } from "react";
import { CLEAR_MESSAGE_USERREDUCER } from "../../Redux/Reducers/userReducer";
import ShowProduct from "../../pages/Dashboard/showProduct";

const settings = ["Update Profile", "Change Password", `Logout`];
const settingsIcons = [<EditIcon />, <ManageAccountsIcon />, <LogoutIcon />];
const pages = [
  "Products",
  "Payment",
  "Blogs",
  "Terms & Conditions",
  "Privacy Policy",
];

function UserHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expandContentInNotification, setExpandContentInNotification] =
    React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);
  const userDetails = useSelector((state) => state.userDetails);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    if (page === "Products") {
      navigate("/user/dashboard");
    } else if (page === "Payment") {
      navigate("/user/payment");
    } else if (page === "Blogs") {
      navigate("/user/blogs");
    } else if (page === "Terms & Conditions") {
      navigate("/user/termsandconditions");
    } else if (page === "Privacy Policy") {
      navigate("/user/privacypolicy");
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Update Profile") {
      navigate("/user/updateuserprofile");
    } else if (setting === "Change Password") {
      navigate("/user/changepassword");
    } else if (setting === "Logout") {
      dispatch({ type: GET_AUTH_LOGOUT });
    }
    setAnchorElUser(null);
  };

  const handleClickNotificationRead = (id) => {
    if (id !== null) {
      dispatch({ type: GET_OBJ_NOTI, payload: { _id: id } });
      // be sure that I have used 'GET_OBJ_NOTI' for just to set {isRead: true}
    }
    setExpandContentInNotification(id);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setExpandContentInNotification(null);
  };

  const handleDeleteNotification = (_id) => {
    dispatch({ type: GET_DELETE_NOTI, payload: { _id: _id } });
  };

  const handleAllDeleteNotifications = () => {
    dispatch({ type: GET_ALL_DELETE_NOTI });

    // dispatch({ type: GET_COUNT_OF_NOTI });
    // dispatch({ type: GET_ALL_NOTI });
    handleClosePopover();
  };

  useEffect(() => {
    if (notification.message) {
      dispatch({ type: GET_COUNT_OF_NOTI });
      dispatch({ type: GET_ALL_NOTI });
      dispatch({ type: CLEAR_MESSAGE_NOTI });
    }
  }, [notification.message]);

  useEffect(() => {
    dispatch({ type: GET_USER_PROFILE_IMAGE });
    dispatch({ type: GET_ALL_NOTI });
    dispatch({ type: GET_COUNT_OF_NOTI });
  }, []);

  useEffect(() => {
    // dispatch({ type: GET_USER_PROFILE_IMAGE });
    // dispatch({ type: CLEAR_MESSAGE_USERREDUCER });
  }, [userDetails.message]);

  useEffect(() => {
    if (!notification.notiCount) {
    }
  }, [!notification.notiCount]);

  useEffect(() => {
    if (Boolean(anchorEl)) {
      dispatch({ type: GET_ALL_NOTI });
    }
  }, [Boolean(anchorEl)]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <StorefrontIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              VFM
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <StorefrontIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              VFM
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 5 }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block", mx: 2 }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
              {/* Notifications */}
              <Box sx={{ mr: 3 }}>
                <Tooltip title="Notifications">
                  <IconButton
                    size="large"
                    aria-label="show badged new notifications"
                    color="inherit"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    {notification.notiCount > 0 ? (
                      <Badge
                        badgeContent={notification.notiCount}
                        color="error"
                      >
                        <NotificationsIcon />
                      </Badge>
                    ) : (
                      <NotificationsIcon />
                    )}
                  </IconButton>
                </Tooltip>{" "}
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  onClose={handleClosePopover}
                >
                  {Boolean(anchorEl) && (
                    <Box>
                      <Stack>
                        <Typography
                          variant="h5"
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            fontSize: 28,
                            color: green["A700"],
                            mt: 2,
                            mb: 2,
                          }}
                        >
                          Notifications
                          <Tooltip title="Delete All Notifications">
                            <Button
                              onClick={handleAllDeleteNotifications}
                              variant="contained"
                              size="small"
                              disabled={!notification.allNoti.length} //CHECK WHEN NOTIFICATION COMES
                              sx={{
                                bgcolor: red[500],
                                "&:hover": {
                                  bgcolor: red["A700"],
                                },
                              }}
                            >
                              <DeleteSweepIcon />
                              &nbsp;DELETE ALL
                            </Button>{" "}
                          </Tooltip>
                        </Typography>
                        <Divider />
                        <Divider />
                        <Divider />
                        <Divider />

                        {notification.loading ? (
                          <LinearProgress color="success" />
                        ) : null}
                      </Stack>
                      <Stack
                        sx={{
                          width: "100%",
                          minWidth: 360,
                        }}
                      >
                        {notification.loading ? null : notification.allNoti
                            .length ? (
                          <List
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              bgcolor: "background.paper",
                              m: 0.5,
                            }}
                          >
                            {notification.allNoti.map(
                              (
                                {
                                  title,
                                  content,
                                  isRead,
                                  _id,
                                  ...restNotiData
                                },
                                index
                              ) => (
                                <UserNotification
                                  {...{
                                    title,
                                    content,
                                    isRead,
                                    _id,
                                    handleClickNotificationRead,
                                    expandContentInNotification,
                                    handleDeleteNotification,
                                  }}
                                  key={index}
                                />
                              )
                            )}
                          </List>
                        ) : (
                          <Typography variant="body1" sx={{ m: 3 }}>
                            No Notifications
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}
                </Popover>
              </Box>

              <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={auth.userProfileImage} alt="User Profile" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Manu FOR USER PROFILE PICTURE */}
                {settings.map((setting, index) => (
                  <div key={index}>
                    {setting === `Logout` ? (
                      <>
                        <Divider />
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}
                          sx={{
                            bgcolor: grey[200],
                            "&:hover": {
                              bgcolor: red[500],
                              borderRadius: 1,
                              m: 0.5,
                              color: "white",
                            },
                          }}
                        >
                          <IconButton>{settingsIcons[index]}</IconButton>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      </>
                    ) : (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <IconButton>{settingsIcons[index]}</IconButton>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    )}
                  </div>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* {auth.loading ? (
        <Box>
          <LinearProgress color="success" />
        </Box>
      ) : (<Box sx={{
        m:2
      }}> */}
      <Box sx={{m:1}}>
        <Routes>
          <Route
            exact
            path="changepassword"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="updateuserprofile"
            element={
              <ProtectedRoute>
                <UpdateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="faqs"
            element={
              <ProtectedRoute>
                <FaqsUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="termsandconditions"
            element={
              <ProtectedRoute>
                <TermsAndConditions />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="privacypolicy"
            element={
              <ProtectedRoute>
                <PrivacyPolicy />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="showproduct"
            element={
              <ProtectedRoute>
                <ShowProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
      {/* </Box>
      )} */}
    </>
  );
}

export default UserHeader;
