import { useEffect, useState } from "react";
import StyledBox from "../../components/StyledBox";
import { useStore } from "../../store/store";
import { Box, Divider } from "@mui/material";
import ImageChangeModal from "./ImageChangeModal";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../common/LoadingComponent";
import ProfileHeader from "./ProfileHeader";
import FollowingsPage from "../profile/FollowingsPage";

const ProfileConfigurations = () => {
  const {
    userStore: { user },
    profileStore: { loadProfile, profile, loadingProfile },
  } = useStore();

  const [editImage, setEditImage] = useState(false);

  useEffect(() => {
    loadProfile(user!.username);
  }, [loadProfile, user]);

  if (loadingProfile || profile === null)
    return <LoadingComponent text="Loading Your Profile" />;

  return (
    <>
      {editImage && (
        <ImageChangeModal handleClose={() => setEditImage(false)} />
      )}
      <StyledBox mt="5rem">
        <ProfileHeader profile={profile} setEditImage={setEditImage} />
        <Divider />
        <Box mb="-6rem" />
        <FollowingsPage />
      </StyledBox>
    </>
  );
};

export default observer(ProfileConfigurations);
