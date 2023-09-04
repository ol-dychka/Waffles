import { Box, Divider, Skeleton } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import StyledBox from "../../components/StyledBox";
import ProfileCardPlaceholder from "./ProfileCardPlaceholder";

const PostCardPlaceholder = () => {
  return (
    <StyledBox mb="2rem">
      <FlexBetween>
        <ProfileCardPlaceholder />
        <Skeleton variant="text" height="1.5rem" width="6rem" />
      </FlexBetween>
      <FlexBetween>
        <Skeleton variant="text" height="2.5rem" width="16rem" />
        <Skeleton
          variant="rounded"
          height="2.2rem"
          width="4rem"
          sx={{ borderRadius: "1rem" }}
        />
      </FlexBetween>
      <Skeleton variant="text" height="1rem" width="100%" />
      <Skeleton variant="text" height="1rem" width="72%" />
      <Skeleton
        variant="text"
        height="1rem"
        width="100%"
        sx={{ marginBottom: "0.5rem" }}
      />
      <Box display="flex" alignItems="center" m="0.25rem 0" gap="0.5rem">
        <Skeleton variant="circular" height="2rem" width="2rem" />
        <Skeleton variant="text" height="2rem" width="1rem" />
      </Box>
      <Divider />
      <Skeleton
        variant="rectangular"
        height="2rem"
        sx={{ marginTop: "0.5rem", borderRadius: "0.5rem" }}
      />
    </StyledBox>
  );
};
export default PostCardPlaceholder;
