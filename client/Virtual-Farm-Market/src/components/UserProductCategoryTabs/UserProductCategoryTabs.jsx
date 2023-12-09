import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY_PRODUCT,
} from "../../Redux/Reducers/productReducer";
import AddsHorizontal from "../AddsHorizontal/AddsHorizontal";
import { SearchInputContexts } from "../../Utils/ContextAPIs/SearchInputContext";

export default function UserProductCategoryTabs({ product }) {
  const [productListFilter, setProductListFilter] = React.useState([]);

  const { searchInput } = React.useContext(SearchInputContexts);

  const BoxStyle = {
    fontFamily: "IBM Plex Sans, sans-serif",
    color: "white",
    cursor: "pointer",
    fontSize: "0.875rem",
    backgroundColor: "transparent",
    width: "100%",
    lineHeight: 1.5,
    border: "none",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: green[400],
    },
    "&:focus": {
      color: "#fff",
      outline: `3px solid ${green[200]}`,
    },
  };

  const { categoryList, productList } = product;
  const dispatch = useDispatch();
  const handleTabClick = (categoryName) => {
    console.log(categoryName);
    if (categoryName === "All Product") {
      dispatch({ type: GET_ALL_PRODUCTS });
    } else {
      dispatch({
        type: GET_PRODUCTS_BY_CATEGORY_PRODUCT,
        payload: { categoryName: categoryName },
      });
    }
  };

  useEffect(() => {
    setProductListFilter(productList);
  }, [productList]);

  useEffect(() => {
    const productListAfterFilter = productList.filter((item) =>
      item.name.toLowerCase().includes(searchInput && searchInput.toLowerCase())
    );
    setProductListFilter(
      productListAfterFilter ? productListAfterFilter : productList
    );
  }, [searchInput]);

  return (
    <Tabs defaultValue={"All Product"}>
      <TabsList>
        <Box onClick={() => handleTabClick("All Product")} sx={BoxStyle}>
          <Tab value={"All Product"}>All Product</Tab>
        </Box>
        {categoryList.length ? (
          <>
            {" "}
            {categoryList.map((category, index) => (
              <Box
                key={category.name}
                onClick={() => handleTabClick(category.name)}
                sx={BoxStyle}
              >
                <Tab value={category.name}>{category.name}</Tab>
              </Box>
            ))}
          </>
        ) : (
          <LinearProgress color="success" />
        )}
      </TabsList>

      {product.loading ? (
        <LinearProgress color="success" />
      ) : (
        <>
          <TabPanel value={"All Product"}>
            <AddsHorizontal />
            <Grid container spacing={3}>
              {productListFilter.length ? (
                productListFilter.map((item, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
                    <Box sx={{ borderRadius: 1 }}>
                      <ProductCard {...{ item }} />
                    </Box>
                  </Grid>
                ))
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                  {categoryList.length ? (
                    <Typography variant="body1">
                      Products are currently not available for this category
                    </Typography>
                  ) : (
                    <LinearProgress color="success" />
                  )}
                </Box>
              )}
            </Grid>
          </TabPanel>
          {categoryList.length ? (
            <>
              {" "}
              {categoryList.map((category, index) => (
                <TabPanel value={category.name} key={index}>
                  <Grid container spacing={3}>
                    {productListFilter.length ? (
                      productListFilter.map((item, index) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
                          <Box sx={{ borderRadius: 1 }}>
                            <ProductCard {...{ item }} />
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Box
                        sx={{ display: "flex", justifyContent: "center", p: 2 }}
                      >
                        <Typography variant="body1">
                          Products are currently not available for this category
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </TabPanel>
              ))}
            </>
          ) : (
            <LinearProgress color="success" />
          )}
        </>
      )}
    </Tabs>
  );
}

const green = {
  50: "#E0F7E0",
  100: "#C1F0C1",
  200: "#A1EAA1",
  300: "#82E382",
  400: "#62DE62",
  500: "#43D943",
  600: "#34D634",
  700: "#24D024",
  800: "#15CB15",
  900: "#06C706",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${green[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${green[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${green[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
    min-width: 400px;
    background-color: ${green[500]};
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start; // Adjusted alignment for scrollable tabs
    overflow-x: auto; // Make the tabs scrollable horizontally
    scrollbar-width: thin;
    scrollbar-color: ${green[200]} ${green[500]};

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${green[500]};
    }

    &::-webkit-scrollbar-track {
      background-color: ${green[200]};
    }

    box-shadow: 0px 4px 6px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.4)" : "rgba(0,0,0, 0.2)"
    };
  `
);
