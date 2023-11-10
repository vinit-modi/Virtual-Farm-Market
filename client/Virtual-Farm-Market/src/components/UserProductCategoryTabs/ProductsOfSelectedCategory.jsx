import { TabPanel } from "@mui/base";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductsOfSelectedCategory({ value, children }) {
  useEffect(() => {
    //Dispatch on value which is _id of category.
  }, [value]);

  return (
    <Box sx={{ px: 2 }}>
      <TabPanel value={value}>
        <Grid container spacing={2}>
          {/* <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}><Box bgcolor={'green'} p={2} >{children.name}</Box></Grid> */}
          
          
          {children.length > 0 ? (



            children.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={item._id}>
                <Box sx={{ borderRadius: 1 }}>
                  <ProductCard {...{item}} />
                </Box>
              </Grid>
            ))



          ) : (
            <Box sx={{ display: "flex",justifyContent:'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default ProductsOfSelectedCategory;
