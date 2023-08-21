import React from "react";
import { Profile } from "../../models/Profile";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography } from "@mui/material";

type Props = {
  profile?: Profile;
  time?: Date;
  text?: string;
  indent?: number;
};

const CommentCard = ({ profile, time, text, indent = 0 }: Props) => {
  return (
    <Box mt="0.5rem" ml={`${indent * 1.5}rem`}>
      <FlexBetween>
        <FlexBetween>
          <img
            src={profile?.image || "/user.png"}
            alt="comm"
            style={{
              width: "1.5rem",
              borderRadius: "50%",
            }}
          />
          <Typography ml="1rem">username</Typography>
        </FlexBetween>
        <Typography>time</Typography>
      </FlexBetween>
      <Typography ml="1rem">
        Suscipit ex ratione fugiat tempus hendrerit dui consequatur nunc
        molestias senectus faucibus.
      </Typography>
    </Box>
  );
};

export default CommentCard;
