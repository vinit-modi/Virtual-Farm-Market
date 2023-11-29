import { Avatar, Skeleton, Stack, Typography } from "@mui/material";

export const cartListSkeleton = () => {
  return [1, 2, 3, 4, 5, 6, 7].map((item,index) => (
    <Stack direction="row" sx={{ pb: 2 }} spacing={2} key={index}>
      <Stack>
        <Skeleton variant="rounded">
          <Avatar sx={{ height: 70, width: 70 }} />
        </Skeleton>
      </Stack>
      <Stack width="100%">
        <Skeleton width="100%" height="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Stack>
    </Stack>
  ));
};
