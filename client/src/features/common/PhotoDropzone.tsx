import { FileUploadOutlined } from "@mui/icons-material";
import { Icon, Typography, useTheme } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setFiles: (files: any) => void;
}

function PhotoDropzone({ setFiles }: Props) {
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: `dashed 3px ${theme.palette.secondary.main}`,
        borderRadius: "1rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input {...getInputProps()} />
      <FileUploadOutlined
        sx={{ fontSize: "8rem", color: theme.palette.secondary.main }}
      />
      <Typography variant="h4" color={theme.palette.secondary.main}>
        Drop you image here
      </Typography>
    </div>
  );
}

export default PhotoDropzone;
