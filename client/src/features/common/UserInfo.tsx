import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useStore } from "../../store/store";
import ProfileCard from "./ProfileCard";
import { Profile } from "../../models/Profile";
import {
  ArticleOutlined,
  AssignmentIndOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";
import { router } from "../../layout/Routes";
import StyledBox from "../../components/StyledBox";
import FlexRight from "../../components/FlexRight";

type Props = {
  profile: Profile;
  isCurrent: boolean;
};

const UserInfo = ({ profile, isCurrent }: Props) => {
  const theme = useTheme();

  const [showBio, setShowBio] = useState(false);

  const bio = `Quibusdam illum eu tellus. Sapiente? Sem. Ullam potenti facilisi sociis
  pariatur ipsum, reprehenderit laboriosam occaecat, deserunt, harum
  facilisis tortor possimus, sem exercitation, corrupti do proident optio
  luctus est, harum morbi? Montes fusce ultricies nunc dapibus aliquam
  quidem eligendi, rem nobis.`;

  const formatBio = (bio: string) => {
    if (bio.length > 100) return bio.substring(0, 97) + "...";
    return bio;
  };

  return (
    <StyledBox
      sx={{
        ".MuiBox-root": {
          "&:hover .MuiTypography-root": {
            fontWeight: "500",
          },
        },
      }}
      mb="2rem"
    >
      <ProfileCard profile={profile} isCurrent />
      <FlexRight>
        <IconButton onClick={() => router.navigate("/myprofile")}>
          <SettingsOutlined sx={{ fontSize: "1.2rem" }} />
        </IconButton>
        <Typography>Edit Profile</Typography>
      </FlexRight>
      <Typography>
        <b>3</b> Subscriptions
      </Typography>
      <Typography>
        <b>2</b> Followers
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Typography>{showBio ? bio : formatBio(bio)}</Typography>

      {bio.length > 100 &&
        (showBio ? (
          <Typography
            color="primary"
            onClick={() => setShowBio(false)}
            sx={{
              cursor: "pointer",
            }}
          >
            {" "}
            Show less
          </Typography>
        ) : (
          <Typography
            color="primary"
            onClick={() => setShowBio(true)}
            sx={{
              cursor: "pointer",
            }}
          >
            {" "}
            Show more
          </Typography>
        ))}
      <Divider sx={{ margin: "1rem 0" }} />

      {isCurrent && (
        <Box
          display="flex"
          alignItems="center"
          padding="0.5rem"
          mb="0.5rem"
          borderRadius="0.5rem"
          sx={{
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              cursor: "pointer",
            },
          }}
          onClick={() => router.navigate("/")}
        >
          <ArticleOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography ml="1rem">My Feed</Typography>
        </Box>
      )}

      <Box
        display="flex"
        alignItems="center"
        padding="0.5rem"
        mb="0.5rem"
        borderRadius="0.5rem"
        sx={{
          "&:hover": {
            bgcolor: theme.palette.secondary.main,
            cursor: "pointer",
          },
        }}
      >
        <AssignmentIndOutlined sx={{ fontSize: "1.5rem" }} />
        <Typography ml="1rem">Subscriptions</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        padding="0.5rem"
        mb="0.5rem"
        borderRadius="0.5rem"
        sx={{
          "&:hover": {
            bgcolor: theme.palette.secondary.main,
            cursor: "pointer",
          },
        }}
      >
        <PersonOutlineOutlined sx={{ fontSize: "1.5rem" }} />
        <Typography ml="1rem">Followers</Typography>
      </Box>

      {isCurrent && (
        <Box
          display="flex"
          alignItems="center"
          padding="0.5rem"
          borderRadius="0.5rem"
          sx={{
            "&:hover": {
              bgcolor: theme.palette.secondary.main,
              cursor: "pointer",
            },
          }}
        >
          <StarOutlineOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography ml="1rem">Liked</Typography>
        </Box>
      )}
    </StyledBox>
  );
};

export default observer(UserInfo);
