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
import AdbIcon from "@mui/icons-material/Adb";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChangePassword from "../../pages/Authentication/ChangePassword";
import UpdateUserProfile from "../../pages/UpdateProfile/UpdateUserProfile";
import FaqsUser from "../../pages/Faqs/FaqsUser";
import TermsAndConditions from "../../pages/Cms/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../../pages/Cms/PrivacyPolicy/PrivacyPolicy";
import ProtectedRoute from "../../auth/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { GET_AUTH_LOGOUT } from "../../Redux/Reducers/authReducer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, LinearProgress } from "@mui/material";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { grey, red } from "@mui/material/colors";
import Payment from "../../pages/Payment/Payment";

const settings = ["Update Profile", "Change Password", `Logout`];
const settingsIcons = [<EditIcon />, <ManageAccountsIcon />, <LogoutIcon />];
const pages = ["Products", "Payment", "Blogs", 'Terms & Conditions','Privacy Policy'];

function UserHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
    } 
    else if (page === "Blogs") {
      navigate("/user/blogs");
    }
    else if (page === 'Terms & Conditions') {
      navigate("/user/termsandconditions");
    }
    else if (page === 'Privacy Policy') {
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
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>

              <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <>
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
                  </>
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
        </Routes>
        {/* </Box>
      )} */}
    </>
  );
}

export default UserHeader;
