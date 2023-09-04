import { Box, Divider, Skeleton } from "@mui/material";
import StyledBox from "../../components/StyledBox";
import ProfileCardPlaceholder from "./ProfileCardPlaceholder";

type Props = {
  isMe?: boolean;
};
const UserInfoPlaceholder = ({ isMe }: Props) => {
  return (
    <StyledBox mb="2rem">
      <ProfileCardPlaceholder />
      {isMe ? (
        <Box display="flex" alignItems="center" gap="1rem" padding="0.5rem">
          <Skeleton variant="circular" height="1.5rem" width="1.5rem" />
          <Skeleton variant="text" height="1.2rem" width="4rem" />
        </Box>
      ) : (
        <Skeleton
          variant="rounded"
          height="2rem"
          width="100%"
          sx={{ borderRadius: "1rem" }}
        />
      )}

      <Skeleton
        variant="text"
        height="1.2rem"
        width="7rem"
        sx={{ marginLeft: "1rem", marginTop: "0.5rem" }}
      />
      <Skeleton
        variant="text"
        height="1.2rem"
        width="5rem"
        sx={{ marginLeft: "1rem" }}
      />
      <Divider sx={{ marginBottom: "0.5rem" }} />
      <Skeleton variant="text" height="1.2rem" width="4rem" />
      <Skeleton variant="text" height="1.2rem" width="3rem" />
      <Skeleton variant="text" height="1.2rem" width="6rem" />
      <Skeleton variant="text" height="1.2rem" width="5rem" />
      <Divider sx={{ marginTop: "1rem" }} />

      {isMe && (
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          padding="0.8rem 0.5rem"
        >
          <Skeleton variant="circular" height="1.5rem" width="1.5rem" />
          <Skeleton variant="text" height="1.2rem" width="4rem" />
        </Box>
      )}

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        padding="0.8rem 0.5rem"
      >
        <Skeleton variant="circular" height="1.5rem" width="1.5rem" />
        <Skeleton variant="text" height="1.2rem" width="4rem" />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        padding="0.8rem 0.5rem"
      >
        <Skeleton variant="circular" height="1.5rem" width="1.5rem" />
        <Skeleton variant="text" height="1.2rem" width="4rem" />
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        padding="0.8rem 0.5rem"
      >
        <Skeleton variant="circular" height="1.5rem" width="1.5rem" />
        <Skeleton variant="text" height="1.2rem" width="4rem" />
      </Box>
    </StyledBox>
  );
};
export default UserInfoPlaceholder;
