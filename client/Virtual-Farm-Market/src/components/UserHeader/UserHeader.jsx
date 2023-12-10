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
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Divider,
  LinearProgress,
  Link,
  List,
  Popover,
  Stack,
} from "@mui/material";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { green, grey, orange, red } from "@mui/material/colors";
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
import ShowProduct from "../../pages/Dashboard/showProduct";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {
  CLEAR_MESSAGE_CART,
  GET_ALLPRODUCTS_CART,
  GET_CART_ITEM_COUNT_CART,
} from "../../Redux/Reducers/cartReducer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CartCard from "../CartCard/CartCard";
import { cartListSkeleton } from "../Skeletons/Skeleton";
import { toast } from "react-toastify";
import { useRef } from "react";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import VFMIcon from "../../Assets/VFMIcon/VFM-Logo.png";
import UserAddressForm from "../../pages/UserAddressForm/UserAddressForm";
import DefaultCredentials from "../../pages/DefaultCredentials/DefaultCredentials";
import PaymentGateway from "../../pages/PaymentGateway/PaymentGateway";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Order from "../../pages/Order/Order";
import { useState } from "react";
import { useContext } from "react";
import { CheckoutContext } from "../../Utils/ContextAPIs/CheckoutContext";
import PaymentSuccess from "../../pages/PaymentSuccess/PaymentSuccess";
import SearchProductInput from "../SearchProductInput/SearchProductInput";

const settings = ["Update Profile", "Change Password", `Logout`];
const settingsIcons = [<EditIcon />, <ManageAccountsIcon />, <LogoutIcon />];
const pages = [
  "Products",
  "Payment",
  "Order",
  "Terms & Conditions",
  "Privacy Policy",
];

function UserHeader() {
  const mainEl = useRef();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expandContentInNotification, setExpandContentInNotification] =
    React.useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [margin, setMargin] = useState("80px 10px");

  const { setCheckoutData } = useContext(CheckoutContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);
  const userDetails = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1338) {
        setMargin("110px 10px");
      } else {
        setMargin("85px 10px");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      navigate("/user/paymentgateway");
    } else if (page === "Order") {
      navigate("/user/order");
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
    setAnchorElCart(null);
    setExpandContentInNotification(null);
  };

  const handleDeleteNotification = (_id) => {
    dispatch({ type: GET_DELETE_NOTI, payload: { _id: _id } });
  };

  const handleAllDeleteNotifications = () => {
    dispatch({ type: GET_ALL_DELETE_NOTI });
    handleClosePopover();
  };

  const handleAnchorForCart = (elementTarget) => {
    dispatch({ type: GET_ALLPRODUCTS_CART });
    setAnchorElCart(elementTarget);
  };

  const handleCheckout = () => {
    const finalCheckout = {
      products:
        cart.cartProductList &&
        cart.cartProductList.map((item, index) => ({
          productId: item.product._id,
          seller: item.seller._id,
          name: item.product.name,
          description: item.product.description,
          category: item.product.category,
          price: item.product.price,
          unit: item.product.unit,
          quantity: item.quantity,
          images: item.product.images,
        })),
      amount: totalAmount,
    };
    setCheckoutData(finalCheckout);
    setAnchorElCart(null);
    navigate("/user/defaultcreds");
  };

  const totalBillAmount = () => {
    const amount =
      cart.cartProductList &&
      cart.cartProductList?.map((element) => {
        return element.quantity * element.product.price;
      });
    if (amount) {
      let sum = 0;
      for (let i = 0; i < amount.length; i++) {
        sum = sum + amount[i];
      }
      setTotalAmount(sum.toFixed(2));
    }
  };

  useEffect(() => {
    dispatch({ type: GET_USER_PROFILE_IMAGE });
    dispatch({ type: GET_ALL_NOTI });
    dispatch({ type: GET_COUNT_OF_NOTI });
    dispatch({ type: GET_CART_ITEM_COUNT_CART });
    dispatch({ type: GET_ALLPRODUCTS_CART });
    totalBillAmount();
  }, []);

  useEffect(() => {
    if (notification.message) {
      dispatch({ type: GET_COUNT_OF_NOTI });
      dispatch({ type: GET_ALL_NOTI });
      dispatch({ type: CLEAR_MESSAGE_NOTI });
    }
  }, [notification.message]);

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

  useEffect(() => {
    if (cart.message) {
      toast.success(cart.message);

      dispatch({ type: CLEAR_MESSAGE_CART });
    }
    totalBillAmount();
  }, [cart.message, dispatch]);

  useEffect(() => {
    if (
      Boolean(anchorElCart) ||
      Boolean(anchorEl) ||
      Boolean(anchorElUser) ||
      Boolean(anchorElNav)
    ) {
      mainEl.current.style.filter = "blur(1.4px)";
    } else {
      mainEl.current.style.filter = "blur(0px)";
    }
  }, [anchorElCart, anchorElUser, anchorEl, anchorElNav]);

  return (
    <>
      <AppBar
        id="main"
        ref={mainEl}
        position="fixed"
        sx={{ bgcolor: green["A700"] }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Link
                // noWrap
                component="a"
                href="#"
                underline="none"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  // display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={VFMIcon}
                  onClick={() => {
                    navigate("/user/dashboard");
                  }}
                  style={{
                    height: "50px",
                    width: "auto",
                    borderRadius: 3,
                    marginRight: "8px",
                  }}
                  alt="VFM Icon"
                />
              </Link>
            </Box>

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

              <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
                <Tooltip title="Virtual Farm Market">
                  <Link
                    // noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    underline="none"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                      // display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      alternative="projectIcon"
                      src={VFMIcon}
                      onClick={() => {
                        navigate("/user/dashboard");
                      }}
                      style={{
                        height: "50px",
                        width: "auto",
                        borderRadius: 3,
                        marginRight: "8px",
                      }}
                      alt="VFM Icon"
                    />
                  </Link>
                </Tooltip>
              </Box>
            </Box>

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

            <Box>
              <SearchProductInput />
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
              <Box sx={{ mr: 2 }}>
                <Tooltip title="Cart">
                  <IconButton
                    size="large"
                    aria-label="show badged new cart count"
                    color="inherit"
                    onClick={(e) => handleAnchorForCart(e.currentTarget)}
                  >
                    {cart.TotalCartQuantityCount > 0 ? (
                      <Badge
                        badgeContent={cart.TotalCartQuantityCount}
                        color="error"
                      >
                        <LocalMallIcon />
                      </Badge>
                    ) : (
                      <LocalMallIcon />
                    )}
                  </IconButton>
                </Tooltip>{" "}
              </Box>
              <Box sx={{ position: "relative" }}>
                <Popover
                  open={Boolean(anchorElCart)}
                  anchorEl={anchorElCart}
                  anchorOrigin={{
                    vertical: isSmallScreen ? "top" : "bottom",
                    horizontal: isSmallScreen ? "left" : "center",
                  }}
                  transformOrigin={{
                    vertical: isSmallScreen ? "bottom" : "top",
                    horizontal: isSmallScreen ? "left" : "right",
                  }}
                  onClose={handleClosePopover}
                >
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        width: isSmallScreen ? "100vw" : 400,
                        height: isSmallScreen ? "100vh" : 700,
                      }}
                    >
                      <Stack>
                        <Stack sx={{ mb: 2 }}>
                          {" "}
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              height: 50,
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                                fontSize: 28,
                                color: green["A700"],
                                my: 2,
                              }}
                            >
                              Cart List
                            </Typography>
                            <IconButton onClick={handleClosePopover}>
                              <CloseIcon />
                            </IconButton>
                          </Box>{" "}
                          <Divider />
                          <Divider />
                          <Divider />
                          <Divider />
                        </Stack>
                        <Stack spacing={1}>
                          {cart.cartProductList ? (
                            cart.cartProductList.map((item, index) => (
                              <Stack key={index}>
                                <CartCard {...{ item, totalBillAmount }} />
                              </Stack>
                            ))
                          ) : (
                            <>{cartListSkeleton()}</>
                          )}
                        </Stack>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                        position: "fixed",
                        top: "735px",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleCheckout()}
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          bgcolor: orange["A700"],
                          "&:hover": { bgcolor: orange["A400"] },
                          left: 210,
                        }}
                        disabled={
                          cart.cartProductList && !cart.cartProductList.length
                        }
                      >
                        CHECKOUT ({totalAmount})
                      </Button>
                    </Box>
                  </Box>
                </Popover>
              </Box>
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

      <Box sx={{ margin }}>
        <Routes>
          <Route
            exact
            path="changepassword"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="dashboard"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="updateuserprofile"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <UpdateUserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="faqs"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <FaqsUser />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="payment"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="termsandconditions"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <TermsAndConditions />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="privacypolicy"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <PrivacyPolicy />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="showproduct"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <ShowProduct {...{ totalBillAmount }} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="defaultcreds"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <DefaultCredentials />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="addaddress"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <UserAddressForm />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="paymentgateway"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <PaymentGateway {...{ handleCheckout }} />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="order"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="paymentsuccess"
            element={
              <ProtectedRoute userTypeAllowed="Customer">
                <PaymentSuccess {...{ setTotalAmount }} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </>
  );
}

export default UserHeader;
