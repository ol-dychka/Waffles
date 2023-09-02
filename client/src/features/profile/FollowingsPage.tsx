import { useEffect } from "react";
import { useStore } from "../../store/store";
import LoadingComponent from "../common/LoadingComponent";
import { useParams } from "react-router";
import StyledBox from "../../components/StyledBox";
import { observer } from "mobx-react-lite";
import {
  Button,
  ButtonGroup,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Predicate } from "../../models/Profile";
import ProfileCard from "../common/ProfileCard";

const FollowingsPage = () => {
  const { username } = useParams<{ username: string }>();

  const isMobile = useMediaQuery("(max-width:750px)");

  const {
    profileStore: {
      profile,
      loading,
      loadProfile,
      loadFollowings,
      loadingFollowings,
      followings,
      setPredicate,
      predicate,
    },
  } = useStore();

  useEffect(() => {
    if (username) {
      loadProfile(username);
      loadFollowings(username, predicate);
    }
  }, [loadProfile, loadFollowings, username, predicate]);

  if (loading || profile === null)
    return <LoadingComponent text="Loading Profile" />;

  return (
    <StyledBox mt="6rem">
      <Typography variant="h4" textAlign="center">
        Choose one of Options Below
      </Typography>
      <ButtonGroup
        variant="text"
        color="secondary"
        fullWidth
        sx={{ padding: isMobile ? "0" : "0 20%" }}
      >
        <Button
          onClick={() => setPredicate(Predicate.Followers)}
          sx={{
            color:
              predicate === Predicate.Followers
                ? "primary.main"
                : "secondary.contrastText",
          }}
        >
          Followers
        </Button>
        <Button
          onClick={() => setPredicate(Predicate.Subscriptions)}
          sx={{
            color:
              predicate === Predicate.Subscriptions
                ? "primary.main"
                : "secondary.contrastText",
          }}
        >
          Subscriptions
        </Button>
        <Button
          onClick={() => setPredicate(Predicate.Friends)}
          sx={{
            color:
              predicate === Predicate.Friends
                ? "primary.main"
                : "secondary.contrastText",
          }}
        >
          Friends
        </Button>
      </ButtonGroup>
      <Divider
        sx={{
          marginBottom: "0.5rem",
        }}
      />
      {loadingFollowings ? (
        <LoadingComponent text={`Loading ${predicate}`} />
      ) : (
        followings.map((following) => <ProfileCard profile={following} />)
      )}
    </StyledBox>
  );
};

export default observer(FollowingsPage);
