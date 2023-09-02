import { observer } from "mobx-react-lite";
import { useStore } from "../../store/store";
import StyledBox from "../../components/StyledBox";
import { Box, Typography } from "@mui/material";

const ServerError = () => {
  const {
    appStore: { error },
  } = useStore();
  return (
    <StyledBox mt="6rem">
      <Typography variant="h4" color="secondary.contrastText">
        Server Error
      </Typography>
      <Typography variant="h4" color="primary">
        {error?.message}
      </Typography>
      {error?.details && (
        <Box margin="1rem" padding="0.5rem" bgcolor="secondary">
          <code>{error.details}</code>
        </Box>
      )}
    </StyledBox>
  );
};

export default observer(ServerError);
