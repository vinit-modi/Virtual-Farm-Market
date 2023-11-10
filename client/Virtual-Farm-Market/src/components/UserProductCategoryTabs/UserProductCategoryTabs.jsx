import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import { CircularProgress, LinearProgress, Typography } from "@mui/material";
import ProductsOfSelectedCategory from "./ProductsOfSelectedCategory";

export default function UserProductCategoryTabs({ product }) {
  const { categoryList, productList } = product;

  return (
    <>
      {categoryList.length ? (
        <Tabs defaultValue={categoryList[0]._id}>
          <TabsList>
            {categoryList.length > 0 ? (
              categoryList.map((item, index) => (
                <Tab value={item._id} key={item._id}>
                  {item.name}
                </Tab>
              ))
            ) : (
              <LinearProgress color="success" />
            )}
          </TabsList>
          {categoryList.length > 0 ? (
            categoryList.map((item, index) => (
              // value should be category ID
              <ProductsOfSelectedCategory value={item._id} key={item._id}>
                {productList}
              </ProductsOfSelectedCategory>
            ))
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Tabs>
      ) : (
        <LinearProgress color="success" />
      )}
    </>
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
