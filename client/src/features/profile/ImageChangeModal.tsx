import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StyledBox from "../../components/StyledBox";
import FlexBetween from "../../components/FlexBetween";
import { CloseOutlined } from "@mui/icons-material";
import PhotoDropzone from "../common/PhotoDropzone";
import PhotoCropper from "../common/PhotoCropper";
import { useStore } from "../../store/store";
import { observer } from "mobx-react-lite";
import StyledButton from "../common/StyledButton";

type Props = {
  handleClose: () => void;
};

const ImageChangeModal = ({ handleClose }: Props) => {
  const [files, setFiles] = useState<object & { preview?: string }[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const {
    profileStore: { uploadPhoto, editing },
  } = useStore();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) =>
        uploadPhoto(blob!).then(() => {
          handleClose();
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: object & { preview?: string }) =>
        URL.revokeObjectURL(file.preview!)
      );
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
              imagePreview={files[0].preview!}
            />
          )}
        </Box>
        <FlexBetween mt="0.5rem">
          <StyledButton
            text="Back"
            handleClick={() => setFiles([])}
            disabled={editing || files.length === 0}
            secondary
          />
          <StyledButton
            text="Set"
            handleClick={onCrop}
            disabled={editing || files.length === 0}
            loading={editing}
          />
        </FlexBetween>
      </StyledBox>
    </Box>
  );
};

export default observer(ImageChangeModal);
