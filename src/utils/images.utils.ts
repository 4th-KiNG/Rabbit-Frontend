import { STORAGE_API } from "../constants/api";

export const GetImage = (busketName: string, fileName: string): string => {
  return `${STORAGE_API}/${busketName}/${fileName}`;
};
