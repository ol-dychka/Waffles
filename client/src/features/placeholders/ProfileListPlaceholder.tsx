import { Box, Divider, Skeleton } from "@mui/material";
import StyledBox from "../../components/StyledBox";
import ProfileCardPlaceholder from "./ProfileCardPlaceholder";

const ProfileListPlaceholder = () => {
  return (
    <StyledBox mb="1rem">
      <Skeleton variant="text" height="2.5rem" width="8rem" />
      <Divider />
      <Box padding="1rem 0.2rem">
        <ProfileCardPlaceholder />
        <ProfileCardPlaceholder />
        <ProfileCardPlaceholder />
      </Box>
    </StyledBox>
  );
};
export default ProfileListPlaceholder;
