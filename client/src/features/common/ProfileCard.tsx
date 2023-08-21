import React from "react";
import { Profile } from "../../models/Profile";
import FlexBetween from "../../components/FlexBetween";
import { IconButton, Typography, useTheme } from "@mui/material";
import { EmailOutlined, MarkEmailReadOutlined } from "@mui/icons-material";
import { router } from "../../layout/Routes";

type Props = {
  // profile is optional just for now
  profile?: Profile;
  isCurrent?: boolean;
  isSubscribed?: boolean;
};

const ProfileCard = ({
  profile = {
    username: "mockuser",
    displayName: "Mock User",
  },
  isCurrent = false,
  isSubscribed = false,
}: Props) => {
  const theme = useTheme();

  return (
    <FlexBetween
      mb="0.5rem"
      padding="0.5rem"
      borderRadius="0.5rem"
      onClick={() => router.navigate(`/profiles/${profile.username}`)}
      sx={{
        "&:hover": {
          bgcolor: theme.palette.secondary.main,
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
      {!isCurrent && (
        <IconButton
        // onClick={() => subscribe()}
        >
          {isSubscribed ? (
            <MarkEmailReadOutlined
              sx={{ fontSize: "1.5rem", color: "secondary.contrastText" }}
            />
          ) : (
            <EmailOutlined
              sx={{ fontSize: "1.5rem", color: "secondary.contrastText" }}
            />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default ProfileCard;
