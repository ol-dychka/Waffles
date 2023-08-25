import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Profile } from "../../models/Profile";
import { useStore } from "../../store/store";
import FlexRight from "../../components/FlexRight";

type Props = { profile: Profile; setEditImage: (mode: boolean) => void };

const ProfileHeader = ({ profile, setEditImage }: Props) => {
  const theme = useTheme();

  const {
    profileStore: { deletePhoto, editing, updateProfile },
  } = useStore();

  const [target, setTarget] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState<string | undefined>("");

  const handleDelete = (e: SyntheticEvent) => {
    setTarget(e.currentTarget.id);
    deletePhoto();
  };

  const handleSetDisplayName = (e: SyntheticEvent, displayName: string) => {
    setTarget(e.currentTarget.id);
    const newProfile: Partial<Profile> = {
      displayName: displayName,
    };
    console.log(newProfile);
    updateProfile(newProfile);
  };

  const handleChangeDisplayName = (e: any) => {
    setDisplayName(e.target.value);
  };

  const handleSetBio = (e: SyntheticEvent, bio: string | undefined) => {
    setTarget(e.currentTarget.id);
    const newProfile: Partial<Profile> = {
      bio: bio,
    };
    console.log(newProfile);
    updateProfile(newProfile);
  };

  const handleChangeBio = (e: any) => {
    setBio(e.target.value);
  };

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setBio(profile.bio);
    }
  }, [setDisplayName, setBio, profile]);

  return (
    <Box mb="1rem">
      <FlexBetween mb="0.5rem">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <img
            src={profile?.image || "/user.png"}
            alt="user-img"
            style={{
              borderRadius: "50%",
              width: "8rem",
            }}
          />
          <FlexBetween gap="1rem">
            <Button
              onClick={() => setEditImage(true)}
              sx={{
                borderRadius: "1rem",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              disabled={editing}
            >
              Set new
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                borderRadius: "1rem",
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.secondary.light,
                },
              }}
              id="delete"
              disabled={editing}
            >
              {target === "delete" && editing ? (
                <CircularProgress color="inherit" size="1.2rem" />
              ) : (
                "Delete"
              )}
            </Button>
          </FlexBetween>
        </Box>

        <Box>
          <FlexRight gap="1rem">
            <Typography variant="h4" color="secondary.dark">
              Username:
            </Typography>
            <Typography variant="h4" color="secondary.contrastText">
              {profile?.username}
            </Typography>
          </FlexRight>
          <FlexRight gap="1rem">
            <Typography variant="h4" color="secondary.dark">
              Display Name:
            </Typography>
            <Box width="10rem" padding="0.2rem 0 0 0">
              <TextField
                value={displayName}
                variant="standard"
                size="small"
                inputProps={{ style: { fontSize: "1.25rem" } }}
                onChange={handleChangeDisplayName}
                fullWidth
              />
            </Box>
            <Button
              onClick={(e) => handleSetDisplayName(e, displayName)}
              sx={{
                borderRadius: "1rem",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              id="displayname"
              disabled={editing || displayName === profile?.displayName}
            >
              {editing && target === "displayname" ? (
                <CircularProgress color="secondary" size="1.2rem" />
              ) : (
                "Save"
              )}
            </Button>
          </FlexRight>
        </Box>
      </FlexBetween>
      <Divider />
      <TextField
        value={bio}
        variant="outlined"
        margin="normal"
        size="small"
        onChange={handleChangeBio}
        fullWidth
        multiline
      />
      <Button
        onClick={(e) => handleSetBio(e, bio)}
        sx={{
          borderRadius: "1rem",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            bgcolor: theme.palette.primary.dark,
          },
        }}
        id="bio"
        disabled={editing || bio === profile?.bio}
      >
        {editing && target === "bio" ? (
          <CircularProgress color="secondary" size="1.2rem" />
        ) : (
          "Save Bio"
        )}
      </Button>
    </Box>
  );
};

export default ProfileHeader;
