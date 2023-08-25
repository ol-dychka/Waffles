import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledBox from "../../components/StyledBox";
import FlexBetween from "../../components/FlexBetween";
import { CloseOutlined } from "@mui/icons-material";
import PhotoDropzone from "../common/PhotoDropzone";
import PhotoCropper from "../common/PhotoCropper";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";

type Props = {
  handleClose: () => void;
};

const ImageChangeModal = ({ handleClose }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const theme = useTheme();

  const {
    profileStore: { uploadPhoto, editing },
  } = useStore();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) =>
        uploadPhoto(blob!).then(() => {
          console.log(blob);
          handleClose();
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Box
      position="fixed"
      bgcolor="rgba(0, 0, 0, 0.8)"
      height="100vh"
      width="100%"
      zIndex="10"
      left="0"
      top="0"
      overflow="auto"
    >
      <StyledBox position="fixed" left="30%" top="20%" width="40%" height="60%">
        <FlexBetween>
          <Typography variant="h4">Select a new image</Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlined sx={{ fontSize: "2rem" }} />
          </IconButton>
        </FlexBetween>
        {/* DROP ZONE */}
        <Box height="80%" display="flex" justifyContent="center">
          {!(files && files.length > 0) ? (
            <PhotoDropzone setFiles={setFiles} />
          ) : (
            <PhotoCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Box>
        <FlexBetween mt="0.5rem">
          <Button
            onClick={() => setFiles([])}
            sx={{
              borderRadius: "1rem",
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.secondary.light,
              },
            }}
            disabled={editing || files.length === 0}
          >
            Back
          </Button>
          <Button
            onClick={onCrop}
            disabled={editing || files.length === 0}
            sx={{
              borderRadius: "1rem",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {editing ? (
              <CircularProgress color="secondary" size="1.2rem" />
            ) : (
              "Set"
            )}
          </Button>
        </FlexBetween>
      </StyledBox>
    </Box>
  );
};

export default observer(ImageChangeModal);
