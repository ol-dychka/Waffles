import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import { Profile } from "../../models/Profile";
import { useStore } from "../../store/store";
import FlexRight from "../../components/FlexRight";
import StyledButton from "../common/StyledButton";

type Props = { profile: Profile; setEditImage: (mode: boolean) => void };

const ProfileHeader = ({ profile, setEditImage }: Props) => {
  const {
    profileStore: { deletePhoto, editing, updateProfile },
  } = useStore();

  const [target, setTarget] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState<string | undefined>("");

  const handleDelete = (id: string) => {
    setTarget(id);
    deletePhoto();
  };

  const handleSetDisplayName = (id: string, displayName: string) => {
    setTarget(id);
    const newProfile: Partial<Profile> = {
      displayName: displayName,
    };
    updateProfile(newProfile);
  };

  const handleChangeDisplayName = (e: any) => {
    setDisplayName(e.target.value);
  };

  const handleSetBio = (id: string, bio: string | undefined) => {
    setTarget(id);
    const newProfile: Partial<Profile> = {
      bio: bio,
    };
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

  console.log(JSON.stringify(profile));

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
            <StyledButton
              text="Set new"
              handleClick={() => setEditImage(true)}
              disabled={editing}
            />
            <StyledButton
              secondary
              text="Delete"
              loading={target === "delete" && editing}
              disabled={editing || profile?.image === null}
              handleClick={() => handleDelete("delete")}
            />
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
            <StyledButton
              text="Save"
              handleClick={() =>
                handleSetDisplayName("displayname", displayName)
              }
              loading={editing && target === "displayname"}
              disabled={editing || displayName === profile?.displayName}
            />
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
      <StyledButton
        text="Save Bio"
        handleClick={() => handleSetBio("bio", bio)}
        loading={editing && target === "bio"}
        disabled={editing || bio === profile?.bio}
      />
    </Box>
  );
};

export default ProfileHeader;
