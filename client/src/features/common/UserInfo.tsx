import { Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../../store/store";
import ProfileCard from "./ProfileCard";
import { Predicate, Profile } from "../../models/Profile";
import {
  ArticleOutlined,
  AssignmentIndOutlined,
  Diversity3Outlined,
  PeopleOutlineOutlined,
  SettingsOutlined,
  StarOutlineOutlined,
} from "@mui/icons-material";
import { router } from "../../layout/Routes";
import StyledBox from "../../components/StyledBox";
import StyledButton from "./StyledButton";
import HoverBox from "./HoverBox";

type Props = {
  profile: Profile;
  isMe?: boolean;
};

const UserInfo = ({ profile, isMe }: Props) => {
  const {
    profileStore: { updateFollowing, editing, setPredicate },
  } = useStore();

  const [showBio, setShowBio] = useState(false);

  const formatBio = (bio: string) => {
    if (bio.length > 100) return bio.substring(0, 97) + "...";
    return bio;
  };

  const handleFollow = (username: string) => {
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
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
      <ProfileCard profile={profile} isMe={isMe} isCurrent />
      {isMe ? (
        <HoverBox onClick={() => router.navigate("/myprofile")}>
          <SettingsOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography ml="1rem">Profile Settings</Typography>
        </HoverBox>
      ) : (
        <StyledButton
          text={profile.following ? "Unfollow" : "Follow"}
          handleClick={() => handleFollow(profile.username)}
          secondary={profile.following}
          disabled={editing}
          loading={editing}
          fullWidth
        />
      )}

      <Typography ml="1rem" mt="0.5rem">
        <b>{profile.subscriptionsCount}</b> Subscription
        {profile.subscriptionsCount === 1 ? "" : "s"}
      </Typography>
      <Typography ml="1rem">
        <b>{profile.followersCount}</b> Follower
        {profile.followersCount === 1 ? "" : "s"}
      </Typography>

      {profile.bio && (
        <>
          <Divider sx={{ margin: "0.5rem 0" }} />
          <Typography
            whiteSpace="normal"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {showBio ? profile.bio : formatBio(profile.bio)}
          </Typography>
        </>
      )}

      {profile.bio &&
        profile.bio.length > 100 &&
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

      {isMe && (
        <HoverBox onClick={() => router.navigate("/")}>
          <ArticleOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography ml="1rem">My Feed</Typography>
        </HoverBox>
      )}

      <HoverBox
        onClick={() => {
          router
            .navigate(`/followings/${profile.username}`)
            .then(() => setPredicate(Predicate.Subscriptions));
        }}
      >
        <AssignmentIndOutlined sx={{ fontSize: "1.5rem" }} />
        <Typography ml="1rem">Subscriptions</Typography>
      </HoverBox>

      <HoverBox
        onClick={() => {
          router
            .navigate(`/followings/${profile.username}`)
            .then(() => setPredicate(Predicate.Followers));
        }}
      >
        <PeopleOutlineOutlined sx={{ fontSize: "1.5rem" }} />
        <Typography ml="1rem">Followers</Typography>
      </HoverBox>

      <HoverBox
        onClick={() => {
          router
            .navigate(`/followings/${profile.username}`)
            .then(() => setPredicate(Predicate.Friends));
        }}
      >
        <Diversity3Outlined sx={{ fontSize: "1.5rem" }} />
        <Typography ml="1rem">Friends</Typography>
      </HoverBox>

      {isMe && (
        <HoverBox>
          <StarOutlineOutlined sx={{ fontSize: "1.5rem" }} />
          <Typography ml="1rem">Liked</Typography>
        </HoverBox>
      )}
    </StyledBox>
  );
};

export default observer(UserInfo);
