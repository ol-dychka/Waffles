import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
};

const PhotoCropper = ({ imagePreview, setCropper }: Props) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: "100%", width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

export default PhotoCropper;
