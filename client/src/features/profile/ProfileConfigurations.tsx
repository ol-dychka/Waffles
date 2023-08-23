import React, { useState } from "react";
import StyledBox from "../../components/StyledBox";
import FlexBetween from "../../components/FlexBetween";
import { useStore } from "../../store/store";
import { EditOutlined } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Profile } from "../../models/Profile";

type Props = {};

const ProfileConfigurations = (props: Props) => {
  const {
    userStore: { user },
  } = useStore();

  const [editDisplayName, setEditDisplayName] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const profile = new Profile(user!);
  return (
    <StyledBox mt="5rem">
      <FlexBetween mb="0.5rem">
        <FlexBetween>
          <img
            src={profile.image || "/user.png"}
            alt="user-img"
            style={{
              borderRadius: "50%",
              width: "4rem",
            }}
          />
          <Button onClick={() => setEditImage(true)}>Set new</Button>
        </FlexBetween>
        <FlexBetween>
          {profile.displayName}
          <IconButton onClick={() => setEditDisplayName(true)}>
            <EditOutlined sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      <Divider />
      <Typography>
        {profile.bio} Alias officiis mollitia! Quia wisi suscipit ullamco
        proident ipsum ullamco morbi varius corporis rhoncus dignissim, fames
        asperiores iure. Eveniet excepturi parturient rerum condimentum
        similique! Habitant quis aenean accusantium dolore! Mollitia in
        consectetur arcu per, lacus metus earum quasi wisi facilis integer
        maecenas? Rerum excepturi, vehicula rem cupidatat optio potenti cubilia.
      </Typography>
      <Button onClick={() => setEditBio(true)}>Edit</Button>
      <Divider />
      <Typography>SUbs Follow Friend...</Typography>
    </StyledBox>
  );
};

export default ProfileConfigurations;
