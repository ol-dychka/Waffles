import React, { SyntheticEvent, useEffect, useState } from "react";
import StyledBox from "../../components/StyledBox";
import FlexBetween from "../../components/FlexBetween";
import { useStore } from "../../store/store";
import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Profile } from "../../models/Profile";
import ImageChangeModal from "./ImageChangeModal";
import { observer } from "mobx-react-lite";
import FlexRight from "../../components/FlexRight";
import LoadingComponent from "../common/LoadingComponent";
import ProfileHeader from "./ProfileHeader";
import FollowingsPage from "./FollowingsPage";

type Props = {};

const ProfileConfigurations = (props: Props) => {
  const theme = useTheme();

  const isMobile = useMediaQuery("(max-width:750px)");

  const {
    userStore: { user },
    profileStore: { loadProfile, profile, loading },
  } = useStore();

  const [editImage, setEditImage] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  useEffect(() => {
    loadProfile(user!.username);
  }, [loadProfile, user]);

  if (loading || profile === undefined)
    return <LoadingComponent text="Loading Your Profile" />;

  return (
    <>
      {editImage && (
        <ImageChangeModal handleClose={() => setEditImage(false)} />
      )}
      <StyledBox mt="5rem">
        <ProfileHeader profile={profile!} setEditImage={setEditImage} />
        <Divider />
        <Box mb="-6rem" />
        <FollowingsPage />
      </StyledBox>
    </>
  );
};

export default observer(ProfileConfigurations);
