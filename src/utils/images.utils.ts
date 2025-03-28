import imageCompression from "browser-image-compression";
import { STORAGE_API } from "../constants/api";

export const GetImage = (busketName: string, fileName: string): string => {
  return `${STORAGE_API}/${busketName}/${fileName}`;
};

export const CompressionImage = async (image: File) => {
  const options = {
    maxSizeMB: 0.5,
    useWebWorker: true,
  };
  try {
    const compressionImage = await imageCompression(image, options);
    return compressionImage;
  } catch (e) {
    console.log(e);
    return image;
  }
};
