import StyledBox from "../../components/StyledBox";
import { Divider, Typography } from "@mui/material";
import ProfileCard from "../common/ProfileCard";
import { Profile } from "../../models/Profile";
import { useStore } from "../../store/store";

type Props = {
  text: string;
  profiles: Profile[];
};

const ProfileList = ({ text, profiles }: Props) => {
  const {
    userStore: { user },
  } = useStore();

  return (
    <StyledBox mb="0.5rem">
      <Typography variant="h4">{text}</Typography>
      <Divider sx={{ margin: "1rem 0" }} />
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.username}
          profile={profile}
          isMe={profile.username === user?.username}
        />
      ))}
      {profiles.length === 0 && <Typography>No one here yet...</Typography>}
    </StyledBox>
  );
};

export default ProfileList;
