import { SyntheticEvent } from "react";
import { Profile } from "../../models/Profile";
import FlexBetween from "../../components/FlexBetween";
import {
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";
import { router } from "../../layout/Routes";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

type Props = {
  profile: Profile;
  isCurrent?: boolean;
  isMe?: boolean;
};

const ProfileCard = ({ profile, isCurrent = false, isMe = false }: Props) => {
  const theme = useTheme();

  const {
    profileStore: { updateFollowing, editing },
  } = useStore();

  const handleFollow = (e: SyntheticEvent, username: string) => {
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  };

  return (
    <FlexBetween
      mb="0.5rem"
      padding="0.5rem"
      borderRadius="0.5rem"
      sx={{
        "&:hover": {
          bgcolor: theme.palette.secondary.main,
        },
      }}
    >
      <FlexBetween
        onClick={() => router.navigate(`/profiles/${profile.username}`)}
        sx={{
          "&:hover": {
            cursor: "pointer",
            ".MuiTypography-root": {
              fontWeight: "500",
            },
          },
        }}
      >
        <img
          src={profile.image || "/user.png"}
          alt="pImage"
          style={{
            height: "2rem",
            borderRadius: "50%",
          }}
        />
        <Typography ml="0.5rem" fontSize="1rem">
          {profile.displayName}
        </Typography>
      </FlexBetween>
      {isMe ? (
        <Typography>You</Typography>
      ) : isCurrent ? (
        <div />
      ) : (
        <IconButton
          onClick={(e) => handleFollow(e, profile.username)}
          disabled={editing}
        >
          {editing ? (
            <CircularProgress color="primary" size="1.2rem" />
          ) : (
            <CheckCircleOutlined
              sx={{
                fontSize: "1.2rem",
                color: profile.following ? "primary.main" : "secondary",
              }}
            />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default observer(ProfileCard);
