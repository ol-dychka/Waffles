import { Skeleton } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";

const ProfileCardPlaceholder = () => {
  return (
    <FlexBetween mb="0.5rem" padding="0.5rem" gap="0.6rem">
      <FlexBetween gap="0.5rem">
        <Skeleton variant="circular" height="2rem" width="2rem" />
        <Skeleton variant="text" height="2rem" width="3rem" />
      </FlexBetween>
      <Skeleton variant="circular" height="1.2rem" width="1.2rem" />
    </FlexBetween>
  );
};
export default ProfileCardPlaceholder;
